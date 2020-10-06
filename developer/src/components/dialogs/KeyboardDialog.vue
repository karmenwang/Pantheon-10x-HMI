<style>
.input{
	font-size: 1.3rem !important;
	color: #444444 !important;
}
.align {
	position:relative;
	top: 10px;
}

.v-btn{
	font-size:1rem !important;
}

</style>

<template>
    <v-dialog v-model="shown" persistent max-width= "1100px" >
        <v-card outlined >
			<v-form ref="form" @submit.prevent="submit">
				<v-card-title>
					<label>{{title}}</label>
				</v-card-title>
				<v-divider></v-divider>
				<v-card-text>
					<div class="row px-3">
						<label class="align">{{ prompt }}</label>
						<v-text-field :rules="[v => !!v || $t('dialog.inputRequired'), v => !isNumericValue || isNumber(parseFloat(v)) || $t('dialog.numberRequired')]"
						dense outlined class= "pl-3 input" @input="onInputChange" color="primary" v-model="input" ></v-text-field>
					</div>
					<simple-keyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="input"></simple-keyboard>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn large depressed color="primary" text @click="hide">{{ $t('generic.cancel') }}</v-btn>
					<v-btn large depressed color="primary" text type="submit">{{ $t('generic.ok') }}</v-btn>
				</v-card-actions>
			</v-form>
        </v-card>
    </v-dialog>
</template>

<script>
'use strict'

export default {
	props: {	//parameters passed through to dialog
		shown: {
			type: Boolean,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		prompt:{
			type:String,
			required:true
		},
		isNumericValue: Boolean,
		preset: [String, Number]
	},
	data: () => ({
		input: ''
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
			if (button === "{enter}" && this.$refs.form.validate()) {
				this.$emit('update:shown', false);
				this.$emit('confirmed', this.isNumericValue ? parseFloat(this.input) : this.input);
			}
		},
		async submit() {
			if (this.$refs.form.validate()) {
				this.$emit('update:shown', false);
				this.$emit('confirmed', this.isNumericValue ? parseFloat(this.input) : this.input);
			}
		},
		onInputChange(input) {
            this.input = input.target.value;
		}
	}
}
</script>
