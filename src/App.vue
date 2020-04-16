<template>
	<div id="app" class="container-fluid">
		<div>
			<b-card no-body>
				<b-tabs card>
					<!-- Render Tabs, supply a unique `key` to each tab -->
					<b-tab v-for="(preset, i) in tabs" :key="'dyn-tab-' + i" :title="preset.name + ' Preset'">
					{{ preset.name }} Preset
						<b-button size="sm" variant="danger" class="float-left" @click="closeTab(preset.name)">
							Delete Preset
						</b-button>
						<Preset :name="preset.name"
							@nameChange="nameChange($event, i)"
							@settingChange="settingChange($event, i)"
							@memberChange="memberChange(i, ...arguments)">
						</Preset>
					</b-tab>

					<!-- New Tab Button (Using tabs-end slot) -->
					<template v-slot:tabs-end>
						<b-nav-item role="presentation" @click.prevent="newTab" href="#"><b>+</b></b-nav-item>
					</template>

					<!-- Render this if no tabs -->
					<template v-slot:empty>
					<div class="text-center text-muted">
						There are no open tabs<br>
						Open a new tab using the <b>+</b> button above.
					</div>
					</template>
				</b-tabs>
			</b-card>
		</div>
	</div>
</template>

<script>

import Preset from './components/Preset'

export default {
	name: 'App',
	components: {
		Preset
	},
	data(){
		return{
			presetArray: [],
			tabs: [],
			tabCounter: 0
		}
	},
	methods: {
		closeTab(x) {
			for (let i = 0; i < this.tabs.length; i++) {
				if (this.tabs[i] === x) {
					this.tabs.splice(i, 1)
				}
			}
		},
		newTab() {
			this.tabs.push(
				{
					name: "Empty "+this.tabCounter++,
					settings: {}
				}
			)
		},
		nameChange(event, i){
			var tempPreset = this.tabs[i];
			tempPreset.name = event
			this.$set(this.tabs, i, tempPreset);
		},
		settingChange(event, i){
			var tempPreset = this.tabs[i];
			tempPreset.settings = event
			this.$set(this.tabs, i, tempPreset);
		},
		memberChange(i, event, name){
			var tempPreset = this.tabs[i];
			tempPreset.settings[name] = event;
			this.$set(this.tabs, i, tempPreset);
		}
	}
}

</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
