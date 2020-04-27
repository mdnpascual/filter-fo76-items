<template>
	<div id="app" class="container-fluid">
		<div>
			<div v-if="processingDone" class="form-group">
				<label for="exampleFormControlTextarea1">PASTE THIS IN YOUR .INI</label>
				<textarea class="form-control" id="exampleFormControlTextarea1" v-model="resultString" rows="12"></textarea>
			</div>
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

					<template v-if="tabCounter > 0 && !processing" v-slot:tabs-start>
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

import Darkmode from 'darkmode-js'

import Preset from './components/Preset'
import AcidJSON from './assets/Junk_Uncommon_Acid Filtered.json';
import AdhesiveJSON from './assets/Junk_VRare_Adhesive Filtered.json';
import AluminumJSON from './assets/Junk_Uncommon_Aluminum Filtered.json';
import AntisepticJSON from './assets/Junk_Uncommon_Antiseptic Filtered.json';
import ArrowJSON from './assets/Ammo_arrow Filtered.json';
import AsbestosJSON from './assets/Junk_Uncommon_Asbestos Filtered.json';
import AttireJSON from './assets/Attire Filtered.json';
import BallisticFiberJSON from './assets/Junk_VRare_BallisticFiber Filtered.json';
import BallisticJSON from './assets/Ammo Filtered.json';
import BlackTitaniumJSON from './assets/Junk_URare_BlackTitanium Filtered.json'
import BobbleheadsJSON from './assets/Bobblehead Filtered.json';
import BobbyPinsJSON from './assets/Bobby_pins Filtered.json';
import BoneJSON from './assets/Junk_Common_Bone Filtered.json';
import CeramicJSON from './assets/Junk_Common_Ceramic Filtered.json';
import ChemJSON from './assets/Chem Filtered.json';
import CircuitryJSON from './assets/Junk_Rare_Circuitry Filtered.json';
import ClothJSON from './assets/Junk_Common_Cloth Filtered.json';
import ConcreteJSON from './assets/Junk_Rare_Concrete Filtered.json';
import CopperJSON from './assets/Junk_Rare_Copper Filtered.json';
import CorkJSON from './assets/Junk_Rare_Cork Filtered.json';
import CrystalJSON from './assets/Junk_VRare_Crystal Filtered.json';
import DiseaseRadJSON from './assets/Aid2 Filtered.json';
import DrinkJSON from './assets/Drink Filtered.json';
import EnergyJSON from './assets/Ammo_energy Filtered.json';
import FertilizerJSON from './assets/Junk_VRare_Fertilizer Filtered.json';
import FluxCobaltJSON from './assets/Flux_Cobalt.json';
import FluxCrimsonJSON from './assets/Flux_Crimson.json';
import FluxFluorescentJSON from './assets/Flux_Fluorescent.json';
import FluxVioletJSON from './assets/Flux_Violet.json';
import FluxYellowcakeJSON from './assets/Flux_Yellowcake.json';
import FluxComponentsJSON from './assets/Flux_Components.json';
import FiberglassJSON from './assets/Junk_Rare_Fiberglass Filtered.json';
import FiberOpticsJSON from './assets/Junk_URare_FiberOptics Filtered.json'
import FullArmorJSON from './assets/Armored Filtered.json';
import GearsJSON from './assets/Junk_VRare_Gear Filtered.json';
import GlassJSON from './assets/Junk_Common_Glass Filtered.json';
import GoldJSON from './assets/Junk_VRare_Gold Filtered.json';
import GrenadeJSON from './assets/Grenade Filtered.json';
import HazmatJSON from './assets/Hazmat Filtered.json';
import HeavyJSON from './assets/Ammo_heavy Filtered.json';
import LeadJSON from './assets/Junk_Uncommon_Lead Filtered.json';
import LeatherJSON from './assets/Junk_Uncommon_Leather Filtered.json';
import MagazineJSON from './assets/Magazine Filtered.json';
import MinesJSON from './assets/Mines Filtered.json';
import MiningJSON from './assets/Mining Filtered.json';
import NuclearMaterialJSON from './assets/Junk_URare_NuclearMaterial Filtered.json'
import NukaJSON from './assets/Nuka Filtered.json';
import OilJSON from './assets/Junk_Rare_Oil Filtered.json';
import PlanJSON from './assets/Plan Filtered.json';
import PlasticJSON from './assets/Junk_Uncommon_Plastic Filtered.json';
import PrewarFoodJSON from './assets/Prewar_Food Filtered.json';
import RecipeJSON from './assets/Recipe Filtered.json';
import RubberJSON from './assets/Junk_Uncommon_Rubber Filtered.json';
import ScrewsJSON from './assets/Junk_Uncommon_Screw Filtered.json';
import SilverJSON from './assets/Junk_Uncommon_Silver Filtered.json';
import SpringsJSON from './assets/Junk_Uncommon_Spring Filtered.json';
import StealthJSON from './assets/Aid_Stealth Filtered.json';
import SteelJSON from './assets/Junk_Common_Steel Filtered.json';
import StimSalveJSON from './assets/Aid Filtered.json';
import UltraciteJSON from './assets/Junk_URare_Ultracite Filtered.json'
import WoodJSON from './assets/Junk_Common_Wood Filtered.json';

export default {
	name: 'App',
	components: {
		Preset
	},
	data(){
		return{
			processing: false,
			processingDone: false,
			resultString: '',
			tabs: [],
			tabCounter: 0,
			Acid: AcidJSON,
			Adhesive: AdhesiveJSON,
			Aluminum: AluminumJSON,
			Antiseptic: AntisepticJSON,
			Arrow: ArrowJSON,
			Asbestos: AsbestosJSON,
			Attire: AttireJSON,
			Ballistic: BallisticJSON,
			BallisticFiber: BallisticFiberJSON,
			BlackTitanium: BlackTitaniumJSON,
			Bobbleheads: BobbleheadsJSON,
			BobbyPins: BobbyPinsJSON,
			Bone: BoneJSON,
			Ceramic: CeramicJSON,
			Chem: ChemJSON,
			Circuitry: CircuitryJSON,
			Cloth: ClothJSON,
			Concrete: ConcreteJSON,
			Copper: CopperJSON,
			Cork: CorkJSON,
			Crystal: CrystalJSON,
			DiseaseRad: DiseaseRadJSON,
			Drink: DrinkJSON,
			Energy: EnergyJSON,
			Fertilizer: FertilizerJSON,
			Fiberglass: FiberglassJSON,
			FiberOptics: FiberOpticsJSON,
			FluxCobalt: FluxCobaltJSON,
			FluxCrimson: FluxCrimsonJSON,
			FluxFluorescent: FluxFluorescentJSON,
			FluxViolet: FluxVioletJSON,
			FluxYellowcake: FluxYellowcakeJSON,
			FluxComponents: FluxComponentsJSON,
			FullArmor: FullArmorJSON,
			Gears: GearsJSON,
			Glass: GlassJSON,
			Gold: GoldJSON,
			Grenade: GrenadeJSON,
			Hazmat: HazmatJSON,
			Heavy: HeavyJSON,
			Lead: LeadJSON,
			Leather: LeatherJSON,
			Magazine: MagazineJSON,
			Mines: MinesJSON,
			Mining: MiningJSON,
			NuclearMaterial: NuclearMaterialJSON,
			Nuka: NukaJSON,
			Oil: OilJSON,
			Plan: PlanJSON,
			Plastic: PlasticJSON,
			PrewarFood: PrewarFoodJSON,
			Recipe: RecipeJSON,
			Rubber: RubberJSON,
			Screws: ScrewsJSON,
			Silver: SilverJSON,
			Springs: SpringsJSON,
			Stealth: StealthJSON,
			Steel: SteelJSON,
			StimSalve: StimSalveJSON,
			Ultracite: UltraciteJSON,
			Wood: WoodJSON,
			startingString: `[660]
n = Containers
t = 0
1 = My Stash Box
2 = Cooking Station
3 = Caps Stash
4 = Vault
5 = My C.A.M.P.
6 = Doctors Bag
7 = Tinker's Workbench
8 = Medical Supplies Vending Machine
9 = Ammunition Vending Machine
10 = Chem Box
11 = Ammo Box
12 = Explosives Crate
13 = Tool Case
14 = Wooden Crate
15 = Chemistry Station
16 = Metal Box
17 = Cooking Stove
18 = Armor Workbench
19 = Toolbox
20 = Power Armor Station
21 = Weapons Workbench
22 = Lunch Pail
23 = Large Toolbox
24 = Footlocker
25 = Cooler
26 = Tool Chest
27 = Paper Bag
28 = Cabinet
29 = First Aid
30 = Safe
31 = Duffle Bag
32 = Brotherhood Corpse
33 = Trunk
34 = Steamer Trunk
35 = Duchess's Stash
36 = Chem Cooler
37 = Industrial Trunk
38 = Bobby Pin Box
39 = My CAMP
40 = Responder Cache
41 = Government Aid Drop
42 = Army Stash Box`
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
			this.processing = true;
			this.resultString += this.startingString
			const htmlDecode = innerHTML => Object.assign(document.createElement('textarea'), {innerHTML}).value;

			var numIndex = 660;

			for(var preset of this.tabs){

				numIndex += 1;
				this.resultString += "\n["+numIndex+"]";
				this.resultString += "\nn = "+preset.name;
				this.resultString += "\nt = 0";

				var arrayList = this.generateArrayList(preset);
				var countIndex = 0;

				for(var entry of arrayList){
					countIndex += 1;
					if(entry.includes("&")){
						entry = htmlDecode(entry);
					}
					this.resultString += "\n"+countIndex+" = "+entry;
				}

			}
			this.processingDone = true;
		},
		generateArrayList(preset){

			var arrayList = [
					...(preset.settings.Aid.Chem ? this.Chem : []),
					...(preset.settings.Aid.DiseaseRad ? this.DiseaseRad : []),
					...(preset.settings.Aid.Drink ? this.Drink : []),
					...(preset.settings.Aid.Nuka ? this.Nuka : []),
					...(preset.settings.Aid.PrewarFood ? this.PrewarFood : []),
					...(preset.settings.Aid.Stealth ? this.Stealth : []),
					...(preset.settings.Aid.StimSalve ? this.StimSalve : []),
					...(preset.settings.Ammo.Arrow ? this.Arrow : []),
					...(preset.settings.Ammo.Ballistic ? this.Ballistic : []),
					...(preset.settings.Ammo.Energy ? this.Energy : []),
					...(preset.settings.Ammo.Grenade ? this.Grenade : []),
					...(preset.settings.Ammo.Heavy ? this.Heavy : []),
					...(preset.settings.Ammo.Mines ? this.Mines : []),
					...(preset.settings.Collectible.Attire ? this.Attire : []),
					...(preset.settings.Collectible.Bobbleheads ? this.Bobbleheads : []),
					...(preset.settings.Collectible.Magazines ? this.Magazine : []),
					...(preset.settings.Collectible.Plan ? this.Plan : []),
					...(preset.settings.Collectible.Recipe ? this.Recipe : []),
					...(preset.settings.Flux.Cobalt ? this.FluxCobalt : []),
					...(preset.settings.Flux.Crimson ? this.FluxCrimson : []),
					...(preset.settings.Flux.Fluorescent ? this.FluxFluorescent : []),
					...(preset.settings.Flux.Violet ? this.FluxViolet : []),
					...(preset.settings.Flux.Yellowcake ? this.FluxYellowcake : []),
					...(preset.settings.Flux.Components ? this.FluxComponents : []),
					...(preset.settings.FullArmor ? this.FullArmor : []),
					...(preset.settings.Hazmat ? this.Hazmat : []),
					...(preset.settings.Mining ? this.Mining : []),
					...(preset.settings.Junk.UltraRareList.BlackTitanium ? this.BlackTitanium : []),
					...(preset.settings.Junk.UltraRareList.FiberOptics ? this.FiberOptics : []),
					...(preset.settings.Junk.UltraRareList.NuclearMaterial ? this.NuclearMaterial : []),
					...(preset.settings.Junk.UltraRareList.Ultracite ? this.Ultracite : []),
					...(preset.settings.Junk.VeryRareList.Adhesive ? this.Adhesive : []),
					...(preset.settings.Junk.VeryRareList.BallisticFiber ? this.BallisticFiber : []),
					...(preset.settings.Junk.VeryRareList.Crystal ? this.Crystal : []),
					...(preset.settings.Junk.VeryRareList.Fertilizer ? this.Fertilizer : []),
					...(preset.settings.Junk.VeryRareList.Gears ? this.Gears : []),
					...(preset.settings.Junk.VeryRareList.Gold ? this.Gold : []),
					...(preset.settings.Junk.RareList.Circuitry ? this.Circuitry : []),
					...(preset.settings.Junk.RareList.Concrete ? this.Concrete : []),
					...(preset.settings.Junk.RareList.Copper ? this.Copper : []),
					...(preset.settings.Junk.RareList.Cork ? this.Cork : []),
					...(preset.settings.Junk.RareList.Fiberglass ? this.Fiberglass : []),
					...(preset.settings.Junk.RareList.Oil ? this.Oil : []),
					...(preset.settings.Junk.UncommonList.Acid? this.Acid : []),
					...(preset.settings.Junk.UncommonList.Aluminum? this.Aluminum : []),
					...(preset.settings.Junk.UncommonList.Antiseptic? this.Antiseptic : []),
					...(preset.settings.Junk.UncommonList.Asbestos? this.Asbestos : []),
					...(preset.settings.Junk.UncommonList.Lead? this.Lead : []),
					...(preset.settings.Junk.UncommonList.Leather? this.Leather : []),
					...(preset.settings.Junk.UncommonList.Plastic? this.Plastic : []),
					...(preset.settings.Junk.UncommonList.Rubber? this.Rubber : []),
					...(preset.settings.Junk.UncommonList.Screws? this.Screws : []),
					...(preset.settings.Junk.UncommonList.Silver? this.Silver : []),
					...(preset.settings.Junk.UncommonList.Springs? this.Springs : []),
					...(preset.settings.Junk.CommonList.Steel? this.Steel : []),
					...(preset.settings.Junk.CommonList.Glass? this.Glass : []),
					...(preset.settings.Junk.CommonList.Wood? this.Wood : []),
					...(preset.settings.Junk.CommonList.Cloth? this.Cloth : []),
					...(preset.settings.Junk.CommonList.Bone? this.Bone : []),
					...(preset.settings.Junk.CommonList.Ceramic? this.Ceramic : []),
				];

				var i = 0;
				for(var entry of arrayList){
					arrayList[i] = entry.trim();
					i++;
				}

				arrayList.sort();
				arrayList = [...new Set(arrayList)];	// REMOVE DUPLICATE

				return arrayList;

		}
	},
	created(){
		new Darkmode().showWidget();
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
.darkmode-layer, .darkmode-toggle {
	z-index: 500;
}
</style>
