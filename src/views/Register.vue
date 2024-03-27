<template>
  <div id="register" class="register-page">
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <h1>Register</h1>
    <el-form
      ref="registerFormRef"
      style="width: 50%"
      :model="registerForm"
      status-icon
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="Name" prop="name">
        <el-input v-model="registerForm.name" />
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input v-model="registerForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Confirm" prop="checkPass">
        <el-input
          v-model="registerForm.checkPass"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(registerFormRef)"
        >Submit</el-button
        >
        <el-button @click="resetForm(registerFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
import { ElNotification } from 'element-plus';
import { publicApi } from '@/services/api';

const router = useRouter();

const registerFormRef = ref<FormInstance>();

const registerForm = reactive({
  name: '',
  pass: '',
  checkPass: '',
});

const validateName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the name'));
  } else {
    callback();
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'));
  } else {
    if (registerForm.checkPass !== '') {
      if (!registerFormRef.value) return;
      registerFormRef.value.validateField('checkPass', () => null);
    }
    callback();
  }
};

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'));
  } else if (value !== registerForm.pass) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};

const rules = reactive<FormRules<typeof registerForm>>({
  name: [{ validator: validateName, trigger: 'blur' }],
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        const res = await publicApi.post('/register', {
          username: registerForm.name,
          password: registerForm.pass,
        });
        if (res.status === 200) {
          console.log('res', res.data.user);
          ElNotification({
            title: 'Success',
            message: `Registration successful for ${res.data.user.username}. Redirect to log in page.`,
            type: 'success',
          });
          setTimeout(() => {
            router.push({ name: 'Login' });
          }, 2000);
        }
      } catch (err) {
        console.log(err);
        ElNotification({
          title: 'Error',
          message: 'Something wrong',
          type: 'error',
        });
      }
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss">
.register-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#register {
  .el-form-item__content {
    justify-content: center;
  }
}
</style>
