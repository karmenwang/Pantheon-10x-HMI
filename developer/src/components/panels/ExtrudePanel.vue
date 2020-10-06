<style>

</style>

<template>
	<v-card outlined>
		<v-card-title>
			<v-icon small class="mr-1">mdi-opacity</v-icon> {{ $t('panel.extrude.caption') }}
		</v-card-title>
		<v-divider></v-divider>

		<div >
			<v-card-text class="px-2 py-0">
				<v-row class="pb-0" align="center" justify="center">
					<v-col v-if="currentTool && currentTool.extruders.length > 1" cols="auto">
						<p class="mb-1">
						{{ $t('panel.extrude.mixRatio') }}
						</p>
						<v-btn-toggle v-model="mix" mandatory multiple>
							<v-btn large text value="mix" :disabled="uiFrozen" color="primary">
								{{ $t('panel.extrude.mix') }}
							</v-btn>
							<v-btn large text v-for="extruder in currentTool.extruders" :key="extruder" :value="extruder" :disabled="uiFrozen" color="primary">
								{{ `E${extruder}` }}
							</v-btn>
						</v-btn-toggle>
					</v-col>
					<v-col>
						<p class="mb-0 pl-2">
						{{ $t('panel.extrude.amount', ['mm']) }}
						</p>
						<v-text-field class = "pl-2" color="secondary" v-model = "amount" placeholder = "Enter amount" type="number" read-only @click = "editAmount(0)" required ></v-text-field>
						<!-- <span>debugging {{amount}}</span>  -->
						<!-- <v-btn-toggle v-model="amount" mandatory class="d-flex">
							<v-btn v-for="(savedAmount, index) in extruderAmounts" :key="index" :value="savedAmount" :disabled="uiFrozen" @contextmenu.prevent="editAmount(index)" class="flex-grow-1">
								{{ savedAmount }}
							</v-btn>
						</v-btn-toggle> -->
					</v-col>
					<v-col>
						<p class="mb-0">
						{{ $t('panel.extrude.feedrate', ['mm/s']) }}
						</p>
						<v-text-field color="secondary" v-model = "feedrate" placeholder = "Enter rate" type="number" read-only @click = "editFeedrate(0)" required ></v-text-field>
						<!-- <span>debugging {{feedrate}}</span> -->
						<!-- <v-btn-toggle v-model="feedrate" mandatory class="d-flex">
							<v-btn v-for="(savedFeedrate, index) in extruderFeedrates" :key="index" :value="savedFeedrate" :disabled="uiFrozen" @contextmenu.prevent="editFeedrate(index)" class="flex-grow-1">
								{{ savedFeedrate }}
							</v-btn>
						</v-btn-toggle> -->
					</v-col>
					<v-col cols="auto" class="flex-shrink-1">
						<div class="pb-6 pr-2">
							<v-btn large color= "#888888" class = "white--text" depressed block :disabled="uiFrozen || !canRetract" :loading="busy" @click="buttonClicked(false)">
								<v-icon>mdi-arrow-up-bold</v-icon> {{ $t('panel.extrude.retract') }}
							</v-btn>
						</div>
						<div class="pr-2">
							<v-btn large color= "#888888" class = "white--text" depressed block :disabled="uiFrozen || !canRetract" :loading="busy" @click="buttonClicked(true)">
								<v-icon>mdi-arrow-down-bold</v-icon> {{ $t('panel.extrude.extrude') }}
							</v-btn>
						</div>
					</v-col>
				</v-row>
			</v-card-text>
		</div>
		<keyboard-dialog is-numeric-value :shown.sync ="editAmountDialog.shown" :prompt="$t('dialog.editExtrusionAmount.prompt')" :title="$t('dialog.editExtrusionAmount.title')" @confirmed="setAmount"></keyboard-dialog>
		<keyboard-dialog is-numeric-value :shown.sync ="editFeedrateDialog.shown" :prompt="$t('dialog.editExtrusionFeedrate.prompt')" :title="$t('dialog.editExtrusionFeedrate.title')" @confirmed="setFeedrate"></keyboard-dialog>
		<!-- <input-dialog :shown.sync="editAmountDialog.shown" :title="$t('dialog.editExtrusionAmount.title')" :prompt="$t('dialog.editExtrusionAmount.prompt')" :preset="editAmountDialog.preset" is-numeric-value @confirmed="setAmount"></input-dialog> -->
		<!-- <input-dialog :shown.sync="editFeedrateDialog.shown" :title="$t('dialog.editExtrusionFeedrate.title')" :prompt="$t('dialog.editExtrusionFeedrate.prompt')" :preset="editFeedrateDialog.preset" is-numeric-value @confirmed="setFeedrate"></input-dialog> -->
	</v-card>
</template>

<script>
'use strict'

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
	computed: {
		...mapGetters(['uiFrozen']),
		...mapState('machine/model', ['heat', 'sensors']),
		...mapGetters('machine/model', ['currentTool']),
		...mapState('machine/settings', ['extruderAmounts', 'extruderFeedrates']),
		canExtrude() {
			if (this.currentTool && this.currentTool.extruders.length > 0) {
				return !this.currentTool.heaters.some(heaterNumber => {
					if (heaterNumber >= 0 && heaterNumber < this.heat.heaters.length) {
						const heaterSensor = this.heat.heaters[heaterNumber].sensor;
						if (heaterSensor >= 0 && heaterSensor < this.sensors.analog.length) {
							const sensor = this.sensors.analog[heaterSensor];
							return !sensor || sensor.lastReading < this.heat.coldExtrudeTemperature;
						}
					}
					return true;
				}, this);
			}
			return false;
		},
		canRetract() {
			if (this.currentTool && this.currentTool.extruders.length > 0) {
				return !this.currentTool.heaters.some(heaterNumber => {
					if (heaterNumber >= 0 && heaterNumber < this.heat.heaters.length) {
						const heaterSensor = this.heat.heaters[heaterNumber].sensor;
						if (heaterSensor >= 0 && heaterSensor < this.sensors.analog.length) {
							const sensor = this.sensors.analog[heaterSensor];
							return !sensor || sensor.lastReading < this.heat.coldRetractTemperature;
						}
					}
					return true;
				}, this);
			}
			return false;
		},
		mix: {
			get() { return this.mixValue; },
			set(value) {
				if (value.length > 1) {
					if (this.mixValue.indexOf('mix') !== value.indexOf('mix')) {
						// Mix is being toggled
						if (value.indexOf('mix') !== -1) {
							this.mixValue = ['mix'];
						} else {
							this.mixValue = value.filter(item => item !== 'mix');
						}
					} else {
						// Selecting another E drive
						this.mixValue = value.filter(item => item !== 'mix');
					}
				} else {
					// One value - OK
					this.mixValue = value;
				}
			}
		}
	},
	data() {

		return {
			busy: false,
			mixValue: ['mix'],
			amount: 10,
			feedrate: 5,
			editAmountDialog: {
				shown: false,
				index: 0,
				preset: 10
			},
			editFeedrateDialog: {
				shown: false,
				index: 0,
				preset: 5
			}
		}
	},
	methods: {
		...mapActions('machine', ['sendCode']),
		...mapMutations('machine/settings', ['setExtrusionAmount', 'setExtrusionFeedrate']),
		async buttonClicked(extrude) {
			if (!this.currentTool.extruders.length) {
				return;
			}

			let amounts;
			if (this.mixValue[0] === 'mix') {
				// Split total amount to extrude evenly
				amounts = [this.amount];
			} else {
				// Extrude given amount via each selected extruder drive
				amounts = this.currentTool.extruders.map(extruder => (this.mix.indexOf(extruder) !== -1) ? this.amount : 0);
			}

			this.busy = true;
			try {
				const amount = amounts.map(amount => extrude ? amount : -amount).join(':');
				await this.sendCode(`M120\nM83\nG1 E${amount} F${this.feedrate * 60}\nM121`);
			} catch (e) {
				// handled before we get here
			}
			this.busy = false;
		},
		editAmount(index) {
			this.editAmountDialog.index = index;
			this.editAmountDialog.preset = this.extruderAmounts[index];
			this.editAmountDialog.shown = true;
		},
		setAmount(value) {
			this.setExtrusionAmount({ index: this.editAmountDialog.index, value });
			this.amount = value;
		},
		editFeedrate(index) {
			this.editFeedrateDialog.index = index;
			this.editFeedrateDialog.preset = this.extruderFeedrates[index];
			this.editFeedrateDialog.shown = true;
		},
		setFeedrate(value) {
			this.setExtrusionFeedrate({ index: this.editFeedrateDialog.index, value });
			this.feedrate = value;
		}
	},
	mounted() {
		this.amount = this.extruderAmounts[0];
		this.feedrate = this.extruderFeedrates[0];
	},
	watch: {
		currentTool(to) {
			if (!to || to.extruders.length <= 1) {
				// Switch back to mixing mode if the selection panel is hidden
				this.mix = ['mix'];
			}
		},
		extruderAmounts() {
			this.amount = this.extruderAmounts[0];
		},
		extruderFeedrates() {
			this.feedrate = this.extruderFeedrates[0];
		}
	}
}
</script>
