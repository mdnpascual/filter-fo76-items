<template>
	<div class="accordion" :id="'accordion'+nameNoSpace">
		<div class="card">
			<div class="card-header" :id="'heading'+nameNoSpace">
				<h3 class="mb-0">
					<div class="d-flex">
						<div class="">
							<label><input type="checkbox" :aria-label="name" class="align-middle" :checked="Object.values(inputObject).every(val => val)" @change="groupChange($event)"><a class="ml-3">{{name}}</a></label>
						</div>
						<div class="flex-grow-1">
							<button class="btn btn-link mw-100 w-100" type="button" data-toggle="collapse" :data-target="'#collapse'+nameNoSpace" aria-expanded="true" :aria-controls="'collapse'+nameNoSpace">
						▼
					</button>
						</div>
					</div>
				</h3>
			</div>

			<div :id="'collapse'+nameNoSpace" class="collapse show" :aria-labelledby="'heading'+nameNoSpace" :data-parent="'#accordion'+nameNoSpace">
				<div class="card-body">
					<div v-for="(value, category) in inputObject" :key="category">
						<label><input type="checkbox" :aria-label="category" class="align-middle" :checked="value" @change="memberChange($event, category)"><a class="ml-3">{{category.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })}}</a></label>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PresetGroup',
	props:{
		name: String,
		inputObject: Object
	},
	data(){
		return{
			nameNoSpace: this.name.replace(" ", "_")
		}
	},
	methods: {
		memberChange(event, name){
			this.inputObject[name] = event.target.checked;
			this.$emit("memberChange", this.inputObject, this.name);
		},
		groupChange(event){
			var checked = event.target.checked;
			for(const property in this.inputObject){
				this.inputObject[property] = checked;
			}
			this.$emit("memberChange", this.inputObject, this.name);
		},
		initialize(){
			this.initialized = true;
			this.$emit("settingChange", this.settings);
		}
	}
}
</script>