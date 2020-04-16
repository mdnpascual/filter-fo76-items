<template>
	<div>
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text" id="inputGroup-sizing-default">Preset Name</span>
			</div>
			<input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="realName" @input="nameChange">
		</div>
	</div>
</template>
<script>
export default {
	name: 'Preset',
	props:{
		name: String
	},
	data(){
		return{
			realName: this.name,
		}
	},
	methods: {
		nameChange(){
			this.$emit("nameChange", this.realName);
		}
	}
}
</script>