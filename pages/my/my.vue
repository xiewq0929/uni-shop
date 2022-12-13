<template>
	<view>
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import mix from '@/mixins/mixins.js'
	export default {
		data() {
			return {
				
			};
		},
		mixins:[mix],
		computed:{
			...mapState('m_user',['token'])
		}
	}
</script>

<style lang="scss" scoped>

</style>
