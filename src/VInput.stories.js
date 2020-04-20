import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import VInput from './VInput';

const pageContainer = () => {
  return {
    template: '<div style="width: 20%;"><story/></div>',
  };
};

export default {
  title: 'Simple input',
  decorators: [pageContainer, withKnobs],
};

export const Default = () => ({
  components: { VInput },
  props: {
    label: {
      default: text('label', ''),
    },
    disabled: {
      default: boolean('disabled', false),
    },
    readonly: {
      default: boolean('readonly', false),
    },
    type: {
      default: text('type', 'text'),
    },
  },
  data() {
    return {
      value: '',
    };
  },
  template:
    '<VInput ref="input" v-model="value" :type="type" :label="label" :disabled="disabled" :readonly="readonly"/>',
});

export const test = () => ({
  components: { VInput },
  props: {
    value: {
      default: text('value', ''),
    },
  },
  data() {
    return {
      hasFocus: false,
      initialValue: '',
    };
  },
  methods: {
    toggle() {
      if (this.hasFocus) {
        this.hasFocus = false;
        this.blur();
      } else {
        this.hasFocus = true;
        this.focus();
      }
    },
    focus() {
      this.$refs.input.focus();
    },
    blur() {
      this.$refs.input.blur();
    },
  },
  template:
    '<div>' +
    '<button @click="toggle">toggle focus on input</button><br>' +
    '<VInput ref="input" v-model="initialValue"/>' +
    '</div>',
});

export const WithLabel = () => ({
  components: { VInput },
  props: {
    label: {
      default: text('label', 'My label'),
    },
    disabled: {
      default: boolean('disabled', false),
    },
    readonly: {
      default: boolean('readonly', false),
    },
    type: {
      default: text('type', 'text'),
    },
  },
  data() {
    return {
      value: '',
    };
  },
  methods: {
    log(event) {
      console.log(event);
    },
  },
  template:
    '<VInput v-model="value" :type="type" :label="label" :disabled="disabled" :readonly="readonly"/>',
});

export const Readonly = () => ({
  components: { VInput },
  props: {
    label: {
      default: text('label', 'My label'),
    },
    disabled: {
      default: boolean('disabled', false),
    },
    readonly: {
      default: boolean('readonly', true),
    },
    type: {
      default: text('type', 'text'),
    },
  },
  data() {
    return {
      value: 'read only input',
    };
  },
  template:
    '<VInput :value="value" :type="type" :label="label" :disabled="disabled" :readonly="readonly" />',
});

export const Disabled = () => ({
  components: { VInput },
  props: {
    label: {
      default: text('label', 'My label'),
    },
    disabled: {
      default: boolean('disabled', true),
    },
    readonly: {
      default: boolean('readonly', false),
    },
    type: {
      default: text('type', 'text'),
    },
  },
  data() {
    return {
      value: 'disabled input',
    };
  },
  template:
    '<VInput :value="value" :type="type" :label="label" :disabled="disabled" :readonly="readonly"/>',
});
