

<style scoped>
.simple-keyboard .hg-button.emptySpace {
  pointer-events: none;
  background-color: transparent;
  border: none;
  box-shadow: none;
}

.simple-keyboard .hg-button.space{
  max-width: 850px;
}


</style>

<template>
  <div :class="keyboardClass"></div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

export default {
  name: "SimpleKeyboard",
  props: {
    keyboardClass: {
      default: "simple-keyboard",
      type: String
    },
    input: {
      type: String
    }
  },
  data: () => ({
    keyboard: null
  }),
  mounted() {
    this.keyboard = new Keyboard({
        onChange: this.onChange,
        onKeyPress: this.onKeyPress,
        layoutName: "numbers",
        mergeDisplay: true,
        theme: "hg-theme-default hg-layout-default ",
        layout: {
            numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {bksp}"," {enter} "],
            default:[
              "q w e r t y u i o p",
              "a s d f g h j k l",
              "{shift} z x c v b n m {bksp}",
              "{numbers} {space} {enter}"
            ],
            shift: [
              "Q W E R T Y U I O P",
              "A S D F G H J K L",
              "{shift} Z X C V B N M {bksp}",
              "{numbers} {space} {enter}"
            ],
        },
        buttonTheme: [
          {class: "hg-spacebar", buttons: "{space}"},
          {class: "hg-numbers", buttons: "1 2 3 4 5 6 7 8 9 0 {abc} {enter} {bksp}"}
        ],
        display:{
          "{bksp}":"⌫",
          "{enter}": "enter ↵",
          "{abc}": "ABC",
          "{numbers}": "123",
          "{shift}": "⇧",
        }
    });
    this.keyboard.setInput(this.input);
    console.log("input", this.input); //debugging tool
  },
  methods: {
    onChange(input) {
      this.$emit("onChange", input);
    },
    onKeyPress(button) {
      this.$emit("onKeyPress", button);
      if (button === "{shift}") this.handleShift();
      if (button === "{numbers}" || button === "{abc}") this.handleNumbers();
    },
    handleShift() {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle = currentLayout !== "default" ? "default" : "shift";

      this.keyboard.setOptions({layoutName: shiftToggle});
    },
    handleNumbers() {
      let currentLayout = this.keyboard.options.layoutName;
      let numbersToggle = currentLayout !== "numbers" ? "numbers" : "default";

      this.keyboard.setOptions({layoutName: numbersToggle});
    }
  },
  watch: {
    input(input) {
      this.keyboard.setInput(input);
    }
  }
};
</script>