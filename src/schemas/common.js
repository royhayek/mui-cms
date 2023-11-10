import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import classNames from "classnames";
import ImageField from "components/Controls/ImageField";
import _ from "lodash";

const SchemaHelpers = {
  text: (classes = {}, schemaProps = {}, uniformsProps = {}) => ({
    type: String,
    label: false,
    ...schemaProps,
    uniforms: {
      type: "text",
      className: classNames(classes.formControl),
      variant: "filled",
      InputProps: { ...uniformsProps.InputProps, disableUnderline: true },
      ...uniformsProps,
    },
  }),
  bool: (classes = {}, schemaProps = {}, uniformsProps = {}) => ({
    type: Boolean,
    label: false,
    ...schemaProps,
    uniforms: {
      type: "bool",
      className: classNames(classes.formControl),
      ...uniformsProps,
    },
  }),
  select: (classes = {}, schemaProps = {}, uniformsProps = {}) => ({
    type: String,
    ...schemaProps,
    uniforms: {
      variant: "filled",
      disableUnderline: true,
      ...uniformsProps,
    },
  }),
  image: (classes = {}, schemaProps = {}, uniformsProps = {}) => ({
    type: Object,
    ...schemaProps,
    uniforms: {
      component: ImageField,
      ...uniformsProps,
    },
  }),
  password: (classes = {}, schemaProps = {}, { show = false, name = "password", toggle, ...uniformsProps } = {}) => ({
    type: String,
    label: false,
    // regEx: SimpleSchema.RegEx.Password,
    ...schemaProps,
    uniforms: {
      type: show ? "text" : "password",
      fullWidth: true,
      variant: "filled",
      className: classes.formControl,
      autoComplete: "current-password",
      InputProps: {
        ...uniformsProps.InputProps,
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => _.isFunction(toggle) && toggle(name)}
              tabIndex={-1}
              size="medium">
              {show ? <VisibilityOff color="primary" /> : <Visibility color="primary" />}
            </IconButton>
          </InputAdornment>
        ),
      },
      ...uniformsProps,
    },
  }),
};

export default SchemaHelpers;
