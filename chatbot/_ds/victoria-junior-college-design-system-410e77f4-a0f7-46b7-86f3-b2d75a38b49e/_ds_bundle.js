/* @ds-bundle: {"format":4,"namespace":"VictoriaJuniorCollegeDesignSystem_410e77","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"403bff6711f7","components/core/Button.jsx":"69448d6aeecc","components/core/Card.jsx":"e273ba017617","components/core/IconButton.jsx":"7a9666178a66","components/core/Tag.jsx":"db7bab98fa9f","components/feedback/Dialog.jsx":"b3d29057e417","components/feedback/Toast.jsx":"d21a79559dee","components/feedback/Tooltip.jsx":"b873b760fe1f","components/forms/Checkbox.jsx":"a805cec7cae8","components/forms/Input.jsx":"1cc27255101f","components/forms/Radio.jsx":"95b114d8c8af","components/forms/Select.jsx":"29f1bb918e51","components/forms/Switch.jsx":"3a8b8dcff8ee","components/navigation/Tabs.jsx":"e0dd1f1068a3","ui_kits/school-website/AboutPage.jsx":"59769244f4e5","ui_kits/school-website/AdmissionsPage.jsx":"37ddd00f7df8","ui_kits/school-website/ContactPage.jsx":"0a7f43cee3e3","ui_kits/school-website/Footer.jsx":"eb76907dc037","ui_kits/school-website/HappeningsPage.jsx":"45d9a6803e0c","ui_kits/school-website/Header.jsx":"ccc57b85a8ac","ui_kits/school-website/HomePage.jsx":"b81e3d705a20"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.VictoriaJuniorCollegeDesignSystem_410e77 = window.VictoriaJuniorCollegeDesignSystem_410e77 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function Badge({
  children,
  tone = 'gold'
}) {
  const tones = {
    gold: {
      background: 'var(--gold-100)',
      color: 'var(--gold-900)'
    },
    maroon: {
      background: 'var(--maroon-700)',
      color: 'var(--color-text-on-brand)'
    },
    neutral: {
      background: 'var(--cream-100)',
      color: 'var(--color-text-secondary)'
    },
    success: {
      background: '#E4F0E6',
      color: 'var(--color-success)'
    }
  };
  const t = tones[tone] || tones.gold;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      ...t,
      fontFamily: 'var(--font-sans-ui)',
      fontSize: 12,
      fontWeight: 600,
      padding: '3px 10px',
      borderRadius: 'var(--radius-pill)',
      display: 'inline-block',
      letterSpacing: 'var(--tracking-wide)'
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const sizeStyles = {
  sm: {
    padding: '6px 14px',
    fontSize: 13
  },
  md: {
    padding: '10px 20px',
    fontSize: 15
  },
  lg: {
    padding: '14px 28px',
    fontSize: 16
  }
};
const variantStyles = {
  primary: {
    background: 'var(--color-brand-primary)',
    color: 'var(--color-text-on-brand)',
    border: '1px solid var(--color-brand-primary)'
  },
  secondary: {
    background: 'var(--color-surface)',
    color: 'var(--color-brand-primary)',
    border: '1px solid var(--color-brand-primary)'
  },
  gold: {
    background: 'var(--color-brand-accent)',
    color: 'var(--color-text-on-gold)',
    border: '1px solid var(--color-brand-accent)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-brand-primary)',
    border: '1px solid transparent'
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button'
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const base = variantStyles[variant] || variantStyles.primary;
  let bg = base.background;
  if (!disabled && variant === 'primary') bg = active ? 'var(--color-brand-primary-active)' : hover ? 'var(--color-brand-primary-hover)' : base.background;
  if (!disabled && variant === 'secondary' && hover) bg = 'var(--cream-100)';
  if (!disabled && variant === 'ghost' && hover) bg = 'var(--cream-100)';
  if (!disabled && variant === 'gold' && hover) bg = 'var(--color-brand-accent-hover)';
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      ...sizeStyles[size],
      ...base,
      background: bg,
      fontFamily: 'var(--font-sans-ui)',
      fontWeight: 600,
      borderRadius: 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'background var(--duration-fast) var(--ease-standard)',
      boxShadow: hover && !disabled && variant === 'primary' ? 'var(--shadow-sm)' : 'none'
    }
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  children,
  image,
  eyebrow,
  title,
  hoverable = true
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans-ui)',
      boxShadow: hoverable && hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transition: 'box-shadow var(--duration-normal) var(--ease-standard)'
    }
  }, image && /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16/10',
      background: 'var(--cream-100)',
      overflow: 'hidden'
    }
  }, image), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-4)'
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--color-brand-primary)',
      marginBottom: 6
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 18,
      color: 'var(--color-text-primary)',
      marginBottom: 6
    }
  }, title), children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function IconButton({
  icon,
  label,
  size = 'md',
  variant = 'ghost',
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  const dims = {
    sm: 32,
    md: 40,
    lg: 48
  }[size];
  const bg = variant === 'primary' ? hover ? 'var(--color-brand-primary-hover)' : 'var(--color-brand-primary)' : hover ? 'var(--cream-100)' : 'transparent';
  const color = variant === 'primary' ? 'var(--color-text-on-brand)' : 'var(--color-brand-primary)';
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": label,
    title: label,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: dims,
      height: dims,
      borderRadius: 'var(--radius-md)',
      border: variant === 'primary' ? '1px solid var(--color-brand-primary)' : '1px solid transparent',
      background: bg,
      color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'background var(--duration-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: dims * 0.45,
      height: dims * 0.45
    }
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  active = false,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      fontFamily: 'var(--font-sans-ui)',
      fontSize: 13,
      fontWeight: 500,
      padding: '6px 14px',
      borderRadius: 'var(--radius-pill)',
      cursor: onClick ? 'pointer' : 'default',
      border: active ? '1px solid var(--color-brand-primary)' : '1px solid var(--color-border)',
      background: active ? 'var(--maroon-700)' : 'var(--color-surface)',
      color: active ? 'var(--color-text-on-brand)' : 'var(--color-text-secondary)',
      transition: 'all var(--duration-fast) var(--ease-standard)'
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  children,
  onClose,
  actions
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(36,26,21,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      fontFamily: 'var(--font-sans-ui)'
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      width: 400,
      maxWidth: '90vw',
      padding: 'var(--space-5)'
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 20,
      color: 'var(--color-text-primary)',
      marginBottom: 12
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--color-text-secondary)',
      lineHeight: 1.5
    }
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'flex-end',
      marginTop: 20
    }
  }, actions)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function Toast({
  tone = 'success',
  children,
  onClose
}) {
  const tones = {
    success: {
      background: 'var(--maroon-900)',
      accent: 'var(--color-success)'
    },
    info: {
      background: 'var(--maroon-900)',
      accent: 'var(--color-info)'
    },
    error: {
      background: 'var(--maroon-900)',
      accent: 'var(--color-danger)'
    }
  };
  const t = tones[tone] || tones.success;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      background: t.background,
      color: '#fff',
      padding: '12px 16px',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      fontFamily: 'var(--font-sans-ui)',
      fontSize: 14,
      borderLeft: `3px solid ${t.accent}`,
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, children), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: 'none',
      border: 'none',
      color: 'var(--gold-400)',
      cursor: 'pointer',
      fontSize: 16
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  children,
  label,
  position = 'top'
}) {
  const [show, setShow] = React.useState(false);
  const posStyle = {
    top: {
      bottom: '120%',
      left: '50%',
      transform: 'translateX(-50%)'
    },
    bottom: {
      top: '120%',
      left: '50%',
      transform: 'translateX(-50%)'
    }
  }[position] || {};
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-block'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      ...posStyle,
      background: 'var(--ink-900)',
      color: '#fff',
      fontSize: 12,
      padding: '6px 10px',
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      fontFamily: 'var(--font-sans-ui)',
      zIndex: 10,
      boxShadow: 'var(--shadow-md)'
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked,
  onChange
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-sans-ui)',
      fontSize: 14,
      color: 'var(--color-text-primary)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 'var(--radius-sm)',
      flexShrink: 0,
      border: checked ? '1px solid var(--color-brand-primary)' : '1px solid var(--color-border-strong)',
      background: checked ? 'var(--color-brand-primary)' : 'var(--color-surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all var(--duration-fast) var(--ease-standard)'
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 6l3 3 5-6",
    stroke: "white",
    strokeWidth: "1.8",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    style: {
      display: 'none'
    }
  }), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans-ui)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--color-text-primary)'
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      padding: '10px 14px',
      fontSize: 14,
      borderRadius: 'var(--radius-md)',
      border: error ? '1px solid var(--color-danger)' : '1px solid var(--color-border)',
      outline: 'none',
      fontFamily: 'inherit',
      color: 'var(--color-text-primary)',
      background: 'var(--color-surface)',
      boxShadow: focus ? 'var(--focus-ring)' : 'none',
      transition: 'box-shadow var(--duration-fast) var(--ease-standard)'
    }
  }), error && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--color-danger)'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  checked,
  onChange,
  name
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-sans-ui)',
      fontSize: 14,
      color: 'var(--color-text-primary)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      flexShrink: 0,
      border: checked ? '1px solid var(--color-brand-primary)' : '1px solid var(--color-border-strong)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-surface)'
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'var(--color-brand-primary)'
    }
  })), /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    checked: checked,
    onChange: onChange,
    style: {
      display: 'none'
    }
  }), label);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  value,
  onChange,
  options = []
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans-ui)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--color-text-primary)'
    }
  }, label), /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      padding: '10px 14px',
      fontSize: 14,
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--color-border)',
      outline: 'none',
      fontFamily: 'inherit',
      color: 'var(--color-text-primary)',
      background: 'var(--color-surface)',
      boxShadow: focus ? 'var(--focus-ring)' : 'none'
    }
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  onChange,
  label
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-sans-ui)',
      fontSize: 14,
      color: 'var(--color-text-primary)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: onChange,
    style: {
      width: 40,
      height: 22,
      borderRadius: 'var(--radius-pill)',
      position: 'relative',
      background: checked ? 'var(--color-brand-primary)' : 'var(--ink-300)',
      transition: 'background var(--duration-fast) var(--ease-standard)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: checked ? 20 : 2,
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: '#fff',
      transition: 'left var(--duration-fast) var(--ease-standard)',
      boxShadow: 'var(--shadow-xs)'
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  active,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans-ui)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      borderBottom: '1px solid var(--color-border)'
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => onChange(t),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '10px 2px',
      fontSize: 14,
      fontWeight: 600,
      color: active === t ? 'var(--color-brand-primary)' : 'var(--color-text-muted)',
      borderBottom: active === t ? '2px solid var(--color-brand-accent)' : '2px solid transparent',
      marginBottom: -1,
      transition: 'color var(--duration-fast) var(--ease-standard)'
    }
  }, t))));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/school-website/AboutPage.jsx
try { (() => {
function SectionHeader({
  eyebrow,
  title
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--color-brand-primary)',
      fontWeight: 700
    }
  }, eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 3,
      background: 'var(--color-brand-accent)',
      margin: '10px 0'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 'var(--text-h1)',
      margin: 0,
      color: 'var(--color-text-primary)'
    }
  }, title));
}
function AboutPage() {
  const {
    Ph
  } = window;
  const {
    Card
  } = window.VictoriaJuniorCollegeDesignSystem_410e77;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--container-padding)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "About Us",
    title: "Get to know VJC's history, people, and what we stand for"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      height: 260,
      marginBottom: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement(Ph, {
    label: "college crest photo"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 22,
      color: 'var(--color-text-primary)'
    }
  }, "Our Crest"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      flexWrap: 'wrap',
      margin: '20px 0 var(--space-7)'
    }
  }, [['Yellow', 'The colour of royalty in Asian cultures — dignity, leadership and care for others.', 'var(--gold-500)', 'var(--ink-900)'], ['Red', 'Symbolises the universal brotherhood and equality of humanity.', 'var(--maroon-700)', '#fff'], ['Book', 'The open book stands for knowledge and wisdom acquired through lifelong learning.', 'var(--cream-100)', 'var(--color-text-primary)'], ['Torch', 'The torch stands for truth and the passing on of tradition.', 'var(--cream-100)', 'var(--color-text-primary)']].map(([t, d, bg, fg]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      flex: '1 1 240px',
      background: bg,
      color: fg,
      padding: 'var(--space-4)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase'
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      marginTop: 8,
      lineHeight: 1.5
    }
  }, d)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 260px'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    image: /*#__PURE__*/React.createElement(Ph, {
      label: "principal photo"
    }),
    eyebrow: "Principal",
    title: "Principal's Welcome"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 260px'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    image: /*#__PURE__*/React.createElement(Ph, {
      label: "1985 opening photo"
    }),
    eyebrow: "Since 1984",
    title: "History of Victoria"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 260px'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    image: /*#__PURE__*/React.createElement(Ph, {
      label: "staff photo"
    }),
    eyebrow: "Our People",
    title: "Meet the educators"
  }))));
}
function SealPage() {
  const {
    Ph
  } = window;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--container-padding)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "The Victorian SEAL",
    title: "Ready to shape the world"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      height: 260,
      marginBottom: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement(Ph, {
    label: "wax seal group photo"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans-ui)',
      fontSize: 16,
      color: 'var(--color-text-secondary)',
      lineHeight: 1.7,
      maxWidth: 700
    }
  }, "Every Victorian is holistically developed, grounded in strong core values and ready for the challenges of the future \u2014 guided by our College Values and the four SEAL domains."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-6)'
    }
  }, ['Service at the Heart', 'Excellence in Co-Curricular Domains', 'Academic Enrichment & Achievement', 'Leadership Impact & Influence'].map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-5)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 18,
      color: 'var(--color-brand-primary)'
    }
  }, d)))));
}
window.AboutPage = AboutPage;
window.SealPage = SealPage;
window.SectionHeader = SectionHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/school-website/AboutPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/school-website/AdmissionsPage.jsx
try { (() => {
function AdmissionsPage() {
  const {
    Tabs,
    Card,
    Input,
    Select,
    Checkbox,
    Button
  } = window.VictoriaJuniorCollegeDesignSystem_410e77;
  const {
    Ph,
    SectionHeader
  } = window;
  const [tab, setTab] = React.useState('JAE');
  const [agree, setAgree] = React.useState(false);
  const copy = {
    JAE: 'Join VJC through the Joint Admissions Exercise after your O-Level results.',
    DSA: 'Apply directly to VJC based on talent in academics, sports, or the arts, ahead of the JAE.',
    'Victoria Cedar Alliance': 'A partnership pathway connecting Victoria Junior College and Victoria School.',
    International: 'Guidance for international students and returning Singaporeans applying to VJC.'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--container-padding)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Admissions",
    title: "Admissions to VJC"
  }), /*#__PURE__*/React.createElement(Tabs, {
    tabs: ['JAE', 'DSA', 'Victoria Cedar Alliance', 'International'],
    active: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-7)',
      flexWrap: 'wrap',
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 320px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans-ui)',
      fontSize: 15,
      color: 'var(--color-text-secondary)',
      lineHeight: 1.7
    }
  }, copy[tab]), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      height: 200,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Ph, {
    label: "admissions photo"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 300px',
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-5)',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      height: 'fit-content'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 18,
      color: 'var(--color-text-primary)'
    }
  }, "Register your interest"), /*#__PURE__*/React.createElement(Input, {
    label: "Full name",
    placeholder: "e.g. Tan Wei Ming"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Applying via",
    options: ['JAE', 'DSA', 'Victoria Cedar Alliance', 'International']
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "I have read the admissions notes",
    checked: agree,
    onChange: e => setAgree(e.target.checked)
  }), /*#__PURE__*/React.createElement(Button, {
    disabled: !agree
  }, "Submit interest"))));
}
window.AdmissionsPage = AdmissionsPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/school-website/AdmissionsPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/school-website/ContactPage.jsx
try { (() => {
function ContactPage() {
  const {
    Input,
    Select,
    Button
  } = window.VictoriaJuniorCollegeDesignSystem_410e77;
  const {
    SectionHeader
  } = window;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--container-padding)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Contact Us",
    title: "We'd love to hear from you"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-7)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 300px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      fontFamily: 'var(--font-sans-ui)',
      fontSize: 14,
      color: 'var(--color-text-secondary)',
      lineHeight: 1.8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--color-text-primary)'
    }
  }, "Address"), /*#__PURE__*/React.createElement("br", null), "20 Marine Vista, Singapore 449035"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--color-text-primary)'
    }
  }, "General Office"), /*#__PURE__*/React.createElement("br", null), "+65 6440 0611"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--color-text-primary)'
    }
  }, "Email"), /*#__PURE__*/React.createElement("br", null), "vjc@moe.edu.sg")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 340px',
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-5)',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Your name",
    placeholder: "Full name"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    placeholder: "you@example.com",
    type: "email"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "I am a",
    options: ['Prospective student', 'Parent', 'Alumnus', 'Other']
  }), /*#__PURE__*/React.createElement(Button, null, "Send message"))));
}
window.ContactPage = ContactPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/school-website/ContactPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/school-website/Footer.jsx
try { (() => {
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--maroon-950)',
      color: 'var(--cream-100)',
      fontFamily: 'var(--font-sans-ui)',
      marginTop: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-7) var(--container-padding)',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'var(--space-6)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 18,
      color: '#fff',
      marginBottom: 8
    }
  }, "Victoria Junior College"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--ink-300)'
    }
  }, "the College by the Sea \xB7 est. 1984")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-7)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold-400)',
      marginBottom: 10,
      fontWeight: 700
    }
  }, "Reach us"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      color: 'var(--ink-300)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Instagram \xB7 @victoriajc_official"), /*#__PURE__*/React.createElement("span", null, "Facebook \xB7 Victoria Junior College"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold-400)',
      marginBottom: 10,
      fontWeight: 700
    }
  }, "College"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      color: 'var(--ink-300)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "About us"), /*#__PURE__*/React.createElement("span", null, "Contact us"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--maroon-800)',
      padding: '14px var(--container-padding)',
      fontSize: 12,
      color: 'var(--ink-300)',
      textAlign: 'center'
    }
  }, "\xA9 2026 Victoria Junior College"));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/school-website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/school-website/HappeningsPage.jsx
try { (() => {
function HappeningsPage() {
  const {
    Card,
    Tag
  } = window.VictoriaJuniorCollegeDesignSystem_410e77;
  const {
    Ph,
    SectionHeader
  } = window;
  const [filter, setFilter] = React.useState('All');
  const items = [['Staff Learning Day 2026', '25 June 2026', 'Culture'], ['Feeling Fab', '28 May 2026', 'Student Life'], ["Student Leaders' Investiture 2026", '25 May 2026', 'Leadership'], ['Sports Day 2026', '12 May 2026', 'CCA'], ['National Day Observance', '8 August 2026', 'Culture'], ['Founder\u2019s Day', '3 August 2026', 'Culture']];
  const cats = ['All', 'Culture', 'Student Life', 'Leadership', 'CCA'];
  const shown = filter === 'All' ? items : items.filter(i => i[2] === filter);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--container-padding)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Happenings at VJC",
    title: "Featured news"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 'var(--space-6)',
      flexWrap: 'wrap'
    }
  }, cats.map(c => /*#__PURE__*/React.createElement(Tag, {
    key: c,
    active: filter === c,
    onClick: () => setFilter(c)
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
      gap: 'var(--space-5)'
    }
  }, shown.map(([t, d, c]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    image: /*#__PURE__*/React.createElement(Ph, {
      label: "news photo"
    }),
    eyebrow: `${c} · ${d}`,
    title: t
  }))));
}
window.HappeningsPage = HappeningsPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/school-website/HappeningsPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/school-website/Header.jsx
try { (() => {
function Header({
  page,
  setPage
}) {
  const {
    IconButton
  } = window.VictoriaJuniorCollegeDesignSystem_410e77;
  const [open, setOpen] = React.useState(false);
  const nav = ['Home', 'About Us', 'Admissions', 'The Victorian SEAL', 'Happenings', 'Contact'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border)',
      position: 'sticky',
      top: 0,
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '14px var(--container-padding)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setPage('Home'),
    style: {
      cursor: 'pointer',
      fontFamily: 'var(--font-serif-display)',
      fontSize: 20,
      color: 'var(--color-brand-primary)',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: '50%',
      background: 'var(--color-brand-primary)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 13,
      fontWeight: 700,
      fontFamily: 'var(--font-sans-ui)'
    }
  }, "VJC"), "Victoria Junior College"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)'
    },
    className: "vjc-desktop-nav"
  }, nav.map(n => /*#__PURE__*/React.createElement("a", {
    key: n,
    onClick: () => setPage(n),
    style: {
      cursor: 'pointer',
      fontFamily: 'var(--font-sans-ui)',
      fontSize: 14,
      fontWeight: 600,
      color: page === n ? 'var(--color-brand-primary)' : 'var(--color-text-secondary)',
      borderBottom: page === n ? '2px solid var(--color-brand-accent)' : '2px solid transparent',
      paddingBottom: 4
    }
  }, n)))));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/school-website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/school-website/HomePage.jsx
try { (() => {
function Ph({
  label,
  h
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: h || '100%',
      background: 'var(--cream-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-text-muted)',
      fontSize: 12,
      fontFamily: 'var(--font-sans-ui)'
    }
  }, label);
}
function HomePage({
  setPage
}) {
  const {
    Button,
    Card,
    Badge
  } = window.VictoriaJuniorCollegeDesignSystem_410e77;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      background: 'var(--maroon-800)',
      color: '#fff',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--cream-100)',
      opacity: 0.08
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--container-padding)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-7)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 420px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold-400)',
      fontWeight: 700,
      marginBottom: 14
    }
  }, "the College by the Sea"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 'var(--text-display-1)',
      lineHeight: 1.05,
      margin: 0
    }
  }, "Welcome to Victoria Junior College"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans-ui)',
      fontSize: 17,
      color: 'var(--cream-100)',
      maxWidth: 480,
      marginTop: 18,
      lineHeight: 1.6
    }
  }, "Founded in 1984, we ignite the imagination of every Victorian to create the future with conviction, courage and compassion."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    onClick: () => setPage('Admissions')
  }, "Explore admissions"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => setPage('The Victorian SEAL'),
    style: {}
  }, "The Victorian SEAL"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 360px',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      height: 300
    }
  }, /*#__PURE__*/React.createElement(Ph, {
    label: "hero photo \u2014 campus"
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--container-padding)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--color-brand-primary)',
      fontWeight: 700
    }
  }, "2025 A-Level Results"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 'var(--text-h1)',
      color: 'var(--color-text-primary)',
      margin: '10px 0 30px'
    }
  }, "The Class of 2025 did us proud"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 320px'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    image: /*#__PURE__*/React.createElement(Ph, {
      label: "students photo"
    }),
    eyebrow: "Culture of Excellence",
    title: "Explore their Victorian journey"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      color: 'var(--color-text-secondary)'
    }
  }, "Be inspired by their achievements."))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 320px'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    image: /*#__PURE__*/React.createElement(Ph, {
      label: "wax seal ceremony photo"
    }),
    eyebrow: "The Victorian SEAL",
    title: "Ready to shape the world"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      color: 'var(--color-text-secondary)'
    }
  }, "Graduate with the Victorian SEAL."))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--color-surface-sunken)',
      padding: 'var(--space-8) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--container-padding)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 'var(--text-h2)',
      margin: 0,
      color: 'var(--color-text-primary)'
    }
  }, "Happenings at VJC"), /*#__PURE__*/React.createElement("a", {
    onClick: () => setPage('Happenings'),
    style: {
      cursor: 'pointer',
      color: 'var(--color-link)',
      fontSize: 14,
      fontWeight: 600
    }
  }, "See all")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      flexWrap: 'wrap'
    }
  }, [['Staff Learning Day 2026', '25 June 2026'], ['Feeling Fab', '28 May 2026'], ["Student Leaders' Investiture 2026", '25 May 2026']].map(([t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      flex: '1 1 280px'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    image: /*#__PURE__*/React.createElement(Ph, {
      label: "news photo"
    }),
    eyebrow: d,
    title: t
  })))))));
}
window.HomePage = HomePage;
window.Ph = Ph;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/school-website/HomePage.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
