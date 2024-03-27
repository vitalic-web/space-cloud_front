<template>
  <div id="login" class="login-page">
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <h1>Login</h1>
    <el-form
      ref="loginFormRef"
      style="width: 50%"
      :model="loginForm"
      status-icon
      :rules="rulesLogin"
      label-width="auto"
    >
      <el-form-item label="Name" prop="name">
        <el-input v-model="loginForm.name" />
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input v-model="loginForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitLoginForm(loginFormRef)"
        >Submit</el-button
        >
        <el-button @click="resetLoginForm(loginFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
import { publicApi } from '@/services/api';
import { ElNotification } from 'element-plus';
import useAuthStore from '@/stores/auth';

const loginFormRef = ref<FormInstance>();

const loginForm = reactive({
  name: '',
  pass: '',
});

const authStore = useAuthStore();
const router = useRouter();

const validateInput = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input'));
  } else {
    callback();
  }
};

const rulesLogin = reactive<FormRules<typeof loginForm>>({
  name: [{ validator: validateInput, trigger: 'blur' }],
  pass: [{ validator: validateInput, trigger: 'blur' }],
});

const submitLoginForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        const res = await publicApi.post('/login', {
          username: loginForm.name,
          password: loginForm.pass,
        });
        if (res.status === 200) {
          console.log('res', res.data);
          authStore.setToken(res.data.token);
          authStore.setUsername(res.data.username);
          ElNotification({
            title: 'Success',
            message: `Auth successful for ${res.data.username}. Redirect to your todos.`,
            type: 'success',
          });
          setTimeout(() => {
            router.push({ name: 'ToDo' });
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

const resetLoginForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss">
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#login {
  .el-form-item__content {
    justify-content: center;
  }
}
</style>
