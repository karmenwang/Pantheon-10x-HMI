<style scoped>
.chart-height-limit {
	max-height: 380px;
}
</style>

<template>
	<v-row>
		<v-col cols="12">
				<job-progress></job-progress>
		</v-col>
		<v-col>
			<v-row dense>
				<v-col cols="12">
					<job-control-panel></job-control-panel>
				</v-col>
			</v-row>
			<v-row dense>
				<v-col cols="12">
					<job-info-panel></job-info-panel>
				</v-col>
			</v-row>
			<v-row dense>
				<v-col cols="12">
					<job-estimations-panel></job-estimations-panel>
				</v-col>
			</v-row>
		</v-col>
		<v-col cols="8">
			<v-row dense>
				<v-col cols="12">
					<job-data-panel></job-data-panel>
				</v-col>
				<v-row>
					<v-col cols="12">
						<layer-chart class="chart-height-limit"></layer-chart>
					</v-col>
				</v-row>
			</v-row>
		</v-col>
	</v-row>
</template>