<template>
	<div>
		<div class="input-group mb-3 mt-3">
			<div class="input-group-prepend">
				<span class="input-group-text" id="inputGroup-sizing-default">Preset Name</span>
			</div>
			<input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="realName" @input="nameChange">
			<div v-if="!initialized" class="input-group-append">
				<button class="btn btn-outline-secondary bg-success text-light" type="button" id="button-addon2" @click="initialize">Initialize Preset</button>
			</div>
		</div>
		<!-- ADD RADIO BUTTONS HERE -->
		<div v-if="initialized">
			<div class="row">
				<div class="col text-xl-left ml-3">
					<PresetGroup
						name="Aid"
						@memberChange="memberChange"
						:inputObject="settings.Aid"></PresetGroup>

				</div>
				<div class="col text-xl-left ml-3">
					<PresetGroup
						name="Ammo"
						@memberChange="memberChange"
						:inputObject="settings.Ammo"></PresetGroup>
				</div>
				<div class="col text-xl-left ml-3">
					<PresetGroup
						name="Collectible"
						@memberChange="memberChange"
						:inputObject="settings.Collectible"></PresetGroup>
				</div>
				<div class="col text-xl-left ml-3">
					<label><input type="checkbox" aria-label="FullArmor" class="align-middle" :checked="settings.FullArmor" @change="memberChange($event.target.checked, 'FullArmor')"><a class="ml-3">FullArmor</a></label><br>
					<label><input type="checkbox" aria-label="Grenade" class="align-middle" :checked="settings.Grenade" @change="memberChange($event.target.checked, 'Grenade')"><a class="ml-3">Grenade</a></label><br>
					<label><input type="checkbox" aria-label="Hazmat" class="align-middle" :checked="settings.Hazmat" @change="memberChange($event.target.checked, 'Hazmat')"><a class="ml-3">Hazmat</a></label><br>
					<label><input type="checkbox" aria-label="Mines" class="align-middle" :checked="settings.Mines" @change="memberChange($event.target.checked, 'Mines')"><a class="ml-3">Mines</a></label><br>
				</div>
			</div>
			<div class="row mt-3">
				<div class="col">
				JUNK SECTION
				</div>
			</div>
			<div class="row mt-3">
				<div class="col text-xl-left ml-3">
					<PresetGroup
							name="Ultra Rare"
							@memberChange="memberChange"
							:inputObject="settings.Junk.UltraRareList"></PresetGroup>
					</div>
				<div class="col text-xl-left ml-3">
					<PresetGroup
							name="Very Rare"
							@memberChange="memberChange"
							:inputObject="settings.Junk.VeryRareList"></PresetGroup>
				</div>
				<div class="col text-xl-left ml-3">
					<PresetGroup
							name="Rare"
							@memberChange="memberChange"
							:inputObject="settings.Junk.RareList"></PresetGroup>
				</div>
				<div class="col text-xl-left ml-3">
					<PresetGroup
							name="Uncommon"
							@memberChange="memberChange"
							:inputObject="settings.Junk.UncommonList"></PresetGroup>
				</div>
			</div>
			<div class="row mt-3">
				<div class="col text-xl-left ml-3">
					<PresetGroup
							name="Common"
							@memberChange="memberChange"
							:inputObject="settings.Junk.CommonList"></PresetGroup>
				</div>
				<div class="col text-xl-left ml-3">
				</div>
				<div class="col text-xl-left ml-3">
				</div>
				<div class="col text-xl-left ml-3">
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import PresetGroup from './PresetGroup'

export default {
	name: 'Preset',
	props:{
		name: String
	},
	components:{
		PresetGroup
	},
	data(){
		return{
			realName: this.name,
			initialized: false,
			settings: {
				Aid: {
					StimSalve: true,
					Stealth: true,
					DiseaseRad: true,
					Chem: true,
					Drink: true,
					PrewarFood: true,
					Nuka: true,
				},
				Ammo: {
					Arrow: false,
					Ballistic: true,
					Energy: false,
					Heavy: false,
				},
				Collectible:{
					Bobbleheads: true,
					Magazines: true,
					Attire: false,
				},
				FullArmor: true,
				Grenade: true,
				Hazmat: true,
				Mines: true,
				Junk: {
					UltraRareList: {
						BlackTitanium: true,
						FiberOptics: true,
						NuclearMaterial: true,
						Ultracite: true
					},
					VeryRareList: {
						Adhesive: true,
						BallisticFiber: true,
						Crystal: true,
						Fertilizer: true,
						Gears: true,
						Gold: true
					},
					RareList:{
						Circuitry: true,
						Concrete: true,
						Copper: true,
						Cork: true,
						Fiberglass: true,
						Oil: true
					},
					UncommonList:{
						Acid: true,
						Aluminum: true,
						Antiseptic: true,
						Asbestos: true,
						Lead: true,
						Leather: true,
						Plastic: true,
						Rubber: true,
						Screws: true,
						Silver: true,
						Springs: true,
					},
					CommonList:{
						Steel: false,
						Glass: false,
						Wood: false,
						Cloth: false,
						Bone: false,
						Ceramic: false,
					}
				}
			}
		}
	},
	methods: {
		nameChange(){
			this.$emit("nameChange", this.realName);
		},
		memberChange(event, name){
			this.$emit("memberChange", event, name);
		},
		initialize(){
			this.initialized = true;
			this.$emit("settingChange", this.settings);
		}
	}
}
</script>