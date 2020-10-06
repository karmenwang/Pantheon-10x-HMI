

<style scoped>

.keyboardContainer {
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  border-radius: 5px;
  /* height:250px; */
}

.numPad {
  margin-left:5px;
  display: flex;
}

.simple-keyboard.hg-theme-default {
  display: inline-block;
}
.simple-keyboard-numpad.simple-keyboard .hg-button{
  height:60px !important;
  width: 50px;
}

.simple-keyboard-main.simple-keyboard {
  background-color:transparent;
  color: #444444;
}

.simple-keyboard-numpad.simple-keyboard {
  background-color: transparent;
  width:250px;
  color: #444444;
}
</style>

<template>
  <!-- <div :class="keyboardClass"></div> -->
  <div class="keyboardContainer">
    <div class="simple-keyboard-main"></div>

    <div class="numPad">
      <div class="simple-keyboard-numpad"></div>
    </div>
  </div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

export default {
  name: "SimpleKeyboard",
  props: {
    input: String,
  },
  data: () => ({
    keyboard: null,
    keyboardNumpad: null
  }),
  mounted() {
    let Options = {
      disableButtonHold: true,
      useMouseEvents:true,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      layoutName: "default",
      mergeDisplay: true,
      theme: "hg-theme-default hg-layout-numeric simple-keyboard",
      syncInstanceInputs: true,
      physicalKeyboardHighlight: true,
      debug: true,
      display:{
          "{bksp}":"⌫",
          "{enter}": "enter ↵",
          "{abc}": "ABC",
          "{numbers}": "123",
          "{shift}": "shift ⇧",
      }
    };
    this.keyboard = new Keyboard(".simple-keyboard-main",{
       ...Options,
      layout: {
        numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {bksp}"," {enter} "], //number keyboard not used but I want to keep the code here for future uses
        default:[
          "q w e r t y u i o p {bksp}",
          "a s d f g h j k l {enter}",
          "{shift} z x c v b n m",
          "{space}"
        ],
        shift: [
          "Q W E R T Y U I O P {bksp}",
          "A S D F G H J K L {enter}",
          "{shift} Z X C V B N M",
          "{space}"
        ],
      }
    });
    
    this.keyboardNumPad = new Keyboard(".simple-keyboard-numpad",{
      ...Options,
      layout:{
        default:[
          "{numpad7} {numpad8} {numpad9}",
          "{numpad4} {numpad5} {numpad6}",
          "{numpad1} {numpad2} {numpad3}",
          "_ 0 {enter}"
        ]
      }
    });
    console.log("input", this.input); //debugging tool
  },
  methods: {
    onChange(input) {
      this.$emit("onChange", input);
    },
    onKeyPress(button) {
      this.$emit("onKeyPress", button);
      if (button === "{shift}") this.handleShift();
      //if (button === "{numbers}" || button === "{abc}") this.handleNumbers();
    },
    handleShift() {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle = currentLayout !== "default" ? "default" : "shift";

      this.keyboard.setOptions({layoutName: shiftToggle});
    },
    // handleNumbers() {
    //   let currentLayout = this.keyboard.options.layoutName;
    //   let numbersToggle = currentLayout !== "numbers" ? "numbers" : "default";

    //   this.keyboard.setOptions({layoutName: numbersToggle});
    // }
  },
  watch: {
    input(input) {
      this.keyboard.setInput(input);
    }
  }
};
</script>