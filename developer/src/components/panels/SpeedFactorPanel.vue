<script>
'use strict'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
	computed: {
		...mapGetters(['uiFrozen']),
		...mapState('machine/model', {
			machineSpeedFactor: state => state.move.speedFactor
		}),
		speedFactor: {
			get() { return (this.machineSpeedFactor !== null) ? (this.machineSpeedFactor * 100): 100; },
			set(value) { this.sendCode(`M220 S${value}`); }
		},
		speedFactorMin() { return Math.max(1, Math.min(100, this.speedFactor - 50)); },
		speedFactorMax() { return Math.max(150, this.speedFactor + 50); }
	},
	methods: mapActions('machine', ['sendCode'])
}
</script>
