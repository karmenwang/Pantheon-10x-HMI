<style>
.input{
	font-size: 1.3rem !important;
	color: #444444 !important;
}
.align {
	position:relative;
	top: 10px;
}

</style>

<template>
    <v-dialog v-model="shown" persistent max-width= "900px" >
        <v-card outlined height="500" >
            <v-card-title>
                <label>{{title}}:</label>
				<!-- <input class="input" @input="onInputChange" :value="input"> -->
				<v-text-field :rules="[v => !!v || $t('dialog.inputRequired'), v => !isNumericValue || isNumber(parseFloat(v)) || $t('dialog.numberRequired')]"
				dense outlined class= "pl-5 align input" @input="onInputChange" color="primary" v-model="input" readonly></v-text-field>
			</v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pt-3">
				<!-- <v-text-field color="primary" v-model="input" :rules="[v => !!v || $t('dialog.inputRequired'), v => !isNumericValue || isNumber(parseFloat(v)) || $t('dialog.numberRequired')]" required autofocus></v-text-field> -->
                <simple-keyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="input"></simple-keyboard>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
'use strict'

export default {
	props: {
		shown: {
			type: Boolean,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		isNumericValue: Boolean
	},
	data: () => ({
		input: ''
        // isKeyboardOpen: false
    }),
	methods: {
		hide() {
			this.$emit('update:shown', false);
			this.$emit('cancelled');
        },
        onChange(input) {
            this.input = input;
		},
		async onKeyPress(button) {
			if (button === "{enter}") {
				this.$emit('update:shown', false);
				this.$emit('confirmed', this.isNumericValue ? parseFloat(this.input) : this.input);
				// this.$emit('confirmed', this.input);
			}
		},
		onInputChange(input) {
            this.input = input.target.value;
		}
	},
	watch: {
		shown(to) {
			if (to) {
				// Apply preset
				this.input = this.preset;
			}
		}
	}
}
</script>
