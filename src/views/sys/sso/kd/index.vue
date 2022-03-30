<template>
  <div></div>
</template>

<script lang="ts">
  import { defineComponent, toRaw } from 'vue';
  import { Oauth2LoginParams } from '/@/api/sys/model/userModel';
  import { useUserStore } from '/@/store/modules/user';
  const userStore = useUserStore();
  interface KingdeeCloudToken {
    access_token: string;
    /**
     * expiresIn
     */
    expires_in: number;
    /**
     * uid
     */
    uid: number;
    /**
     * nickname
     */
    nickname: string;
    /**
     * avatar
     */
    avatar: string;
  }

  export default defineComponent({
    name: 'KingdeeCloud',

    data() {
      return {
        KD_ACCESS_TOKEN_URL: '/api-auth/oauth/kd/code?code=',
        LoginStatus: Boolean,
      };
    },

    async mounted() {
      var codeUrl = window.location.href;
      var code;
      if (codeUrl.indexOf('code') >= 0) {
        code = codeUrl.substring(codeUrl.indexOf('=') + 1);
      }
      const url = this.KD_ACCESS_TOKEN_URL + code;
      const kdAccessToken = await userStore.getThirdAccessTokenByCode<KingdeeCloudToken>(url);
      const userInfo = await userStore.login(
        toRaw<Oauth2LoginParams>({
          grantType: 'kd_token',
          accessToken: kdAccessToken.access_token,
        })
      );
      console.log(userInfo);
    },
  });
</script>

<style lang="scss" scoped></style>
