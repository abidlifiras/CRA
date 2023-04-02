<template>
	<div class="popup">
		<div class="popup-inner">
			<slot/>
		</div>
	</div>
</template>

<script>
export default {
	props: ['TogglePopup'],
}
</script>

<style>
.popup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
	background-color: rgba(0, 0, 0, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
}

.popup-inner {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  max-height: 70vh;
  max-width: 70vw;
  height: 60%;
  width: 60%;
}
</style>
