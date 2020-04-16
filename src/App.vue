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

					<template v-if="tabCounter > 0" v-slot:tabs-start>
						<b-nav-item role="presentation" @click.prevent="generate" href="#"><b>Generate .ini</b></b-nav-item>
					</template>

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
import StimSalveJSON from './assets/Aid Filtered.json';
import StealthJSON from './assets/Aid_Stealth Filtered.json';
import DiseaseRadJSON from './assets/Aid2 Filtered.json';
import BallisticJSON from './assets/Ammo Filtered.json';
import ArrowJSON from './assets/Ammo_arrow Filtered.json';
import EnergyJSON from './assets/Ammo_energy Filtered.json';
import HeavyJSON from './assets/Ammo_heavy Filtered.json';
import FullArmorJSON from './assets/Armored Filtered.json';
import AttireJSON from './assets/Attire Filtered.json';
import BobbleheadsJSON from './assets/Bobblehead Filtered.json';
import BobbyPinsJSON from './assets/Bobby_pins Filtered.json';
import ChemJSON from './assets/Chem Filtered.json';
import DrinkJSON from './assets/Drink Filtered.json';
import GrenadeJSON from './assets/Grenade Filtered.json';
import HazmatJSON from './assets/Hazmat Filtered.json';
import MagazineJSON from './assets/Magazine Filtered.json';
import MinesJSON from './assets/Mines Filtered.json';
import NukaJSON from './assets/Nuka Filtered.json';
import PrewarFoodJSON from './assets/Prewar_Food Filtered.json';

import BoneJSON from './assets/Junk_Common_Bone Filtered.json';
import CeramicJSON from './assets/Junk_Common_Ceramic Filtered.json';
import ClothJSON from './assets/Junk_Common_Cloth Filtered.json';
import GlassJSON from './assets/Junk_Common_Glass Filtered.json';
import SteelJSON from './assets/Junk_Common_Steel Filtered.json';
import WoodJSON from './assets/Junk_Common_Wood Filtered.json';
import AntisepticJSON from './assets/Junk_Uncommon_Antiseptic Filtered.json';


export default {
	name: 'App',
	components: {
		Preset
	},
	data(){
		return{
			presetArray: [],
			tabs: [],
			tabCounter: 0,
			StimSalve: StimSalveJSON,
			Stealth: StealthJSON,
			DiseaseRad: DiseaseRadJSON,
			Ballistic: BallisticJSON,
			Arrow: ArrowJSON,
			Energy: EnergyJSON,
			Heavy: HeavyJSON,
			FullArmor: FullArmorJSON,
			Attire: AttireJSON,
			Bobbleheads: BobbleheadsJSON,
			BobbyPins: BobbyPinsJSON,
			Chem: ChemJSON,
			Drink: DrinkJSON,
			Grenade: GrenadeJSON,
			Hazmat: HazmatJSON,
			Magazine: MagazineJSON,
			Mines: MinesJSON,
			Nuka: NukaJSON,
			PrewarFood: PrewarFoodJSON,
			Bone: BoneJSON,
			Ceramic: CeramicJSON,
			Cloth: ClothJSON,
			Glass: GlassJSON,
			Steel: SteelJSON,
			Wood: WoodJSON,
			Antiseptic: AntisepticJSON,

		}
	},
	methods: {
		closeTab(x) {
			for (let i = 0; i < this.tabs.length; i++) {
				if (this.tabs[i].name === x) {
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
		},
		generate(){
			console.log("WOWEEEEEEEEEEE");
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
