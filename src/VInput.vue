<template>
  <div
    class="input-group"
    @mouseenter="mouseEnter = true"
    @mouseleave="mouseEnter = false"
  >
    <label>
      <span class="input-group__label" v-text="label" />
      <input
        ref="input"
        :class="inputClasses"
        data-testid="input-element"
        :value="value"
        :readonly="readonly"
        :disabled="disabled"
        v-bind="$attrs"
        v-on="inputListeners"
        @focus="inputFocus = true"
        @blur="inputFocus = false"
        @keydown.tab="clearButtonFocus = true"
      />
    </label>
    <span
      v-if="showClearButton"
      class="input-group__clear"
      data-testid="clear-button"
      role="button"
      aria-label="Очистить"
      tabindex="0"
      @click="handleClickClear"
      @keydown="handleKeydownClear"
    />
  </div>
</template>

<script>
export default {
  name: 'VInput',
  props: {
    value: {
      type: String,
      required: true,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  inheritAttrs: false,
  data() {
    return {
      inputFocus: false,
      clearButtonFocus: false,
      mouseEnter: false,
    };
  },
  computed: {
    inputListeners() {
      return {
        ...this.$listeners,
        input: this.handleInput,
      };
    },
    inputClasses() {
      let baseClass = 'input-group__input';
      if (this.clearable) {
        return `${baseClass} ${baseClass}--clearable`;
      }
      return baseClass;
    },
    showClearButton() {
      return (
        !!this.value.length &&
        this.clearable &&
        (this.inputFocus || this.clearButtonFocus || this.mouseEnter)
      );
    },
    clearable() {
      return !this.disabled && !this.readonly;
    },
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value);
    },
    handleClickClear() {
      this.$emit('input', '');
      this.$refs.input.focus();
      this.clearButtonFocus = false;
    },
    handleKeydownClear(event) {
      const code = event.code.toLowerCase();
      if (code === 'enter') {
        this.handleClickClear();
      } else if (code === 'tab' && event.shift) {
        this.inputFocus = true;
        this.clearButtonFocus = false;
      } else if (code === 'tab') {
        this.clearButtonFocus = false;
      }
    },
    focus() {
      this.$refs.input.focus();
    },
    blur() {
      this.$refs.input.blur();
    },
  },
};
</script>

<style lang="scss" scoped>
.input-group {
  position: relative;
  &__label {
    display: inline-block;
    margin-bottom: 0.2em;
  }
  &__input {
    box-sizing: border-box;
    padding: 1px 3px;
    width: 100%;
    height: 30px;
    &--clearable {
      padding-right: 25px;
    }
  }
  &__clear {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 30px;
    width: 25px;
    opacity: 0.3;
    transition: opacity 0.1s ease-out;
    cursor: pointer;
    background: url('/cross.svg') no-repeat center;
    background-size: 50%;
    &:hover {
      opacity: 0.45;
    }
    &:focus,
    &:active {
      opacity: 0.6;
    }
  }
}
</style>
