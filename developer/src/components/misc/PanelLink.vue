<style scoped>
span {
	cursor: default;
}

a:link {
    text-decoration: none;
}

</style>

<template>
	<a v-if="active" href="javascript:void(0)" @click="$emit('click', $event)">
		<slot></slot>
	</a>
	<span v-else>
		<slot></slot>
	</span>
</template>

<script>
'use strict'

export default {
	props: {
		active: Boolean
	}
}
</script>
