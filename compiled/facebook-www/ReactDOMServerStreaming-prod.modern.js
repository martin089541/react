/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 * @nolint
 * @preventMunge
 * @preserve-invariant-messages
 */

"use strict";
var React = require("react"),
  ReactDOM = require("react-dom");
function writeChunk(destination, chunk) {
  destination.buffer += chunk;
}
function writeChunkAndReturn(destination, chunk) {
  destination.buffer += chunk;
  return !0;
}
var assign = Object.assign,
  dynamicFeatureFlags = require("ReactFeatureFlags"),
  enableCustomElementPropertySupport =
    dynamicFeatureFlags.enableCustomElementPropertySupport,
  enableAsyncActions = dynamicFeatureFlags.enableAsyncActions,
  hasOwnProperty = Object.prototype.hasOwnProperty,
  VALID_ATTRIBUTE_NAME_REGEX = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ),
  illegalAttributeNameCache = {},
  validatedAttributeNameCache = {};
function isAttributeNameSafe(attributeName) {
  if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
    return !0;
  if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return !1;
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
    return (validatedAttributeNameCache[attributeName] = !0);
  illegalAttributeNameCache[attributeName] = !0;
  return !1;
}
var unitlessNumbers = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  ),
  aliases = new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]),
  matchHtmlRegExp = /["'&<>]/;
function escapeTextForBrowser(text) {
  if ("boolean" === typeof text || "number" === typeof text) return "" + text;
  text = "" + text;
  var match = matchHtmlRegExp.exec(text);
  if (match) {
    var html = "",
      index,
      lastIndex = 0;
    for (index = match.index; index < text.length; index++) {
      switch (text.charCodeAt(index)) {
        case 34:
          match = "&quot;";
          break;
        case 38:
          match = "&amp;";
          break;
        case 39:
          match = "&#x27;";
          break;
        case 60:
          match = "&lt;";
          break;
        case 62:
          match = "&gt;";
          break;
        default:
          continue;
      }
      lastIndex !== index && (html += text.slice(lastIndex, index));
      lastIndex = index + 1;
      html += match;
    }
    text = lastIndex !== index ? html + text.slice(lastIndex, index) : html;
  }
  return text;
}
var uppercasePattern = /([A-Z])/g,
  msPattern = /^ms-/,
  isJavaScriptProtocol =
    /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function sanitizeURL(url) {
  return isJavaScriptProtocol.test("" + url)
    ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
    : url;
}
var isArrayImpl = Array.isArray,
  ReactSharedInternals =
    React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  ReactDOMCurrentDispatcher =
    ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Dispatcher,
  ReactDOMServerDispatcher = {
    prefetchDNS: prefetchDNS,
    preconnect: preconnect,
    preload: preload,
    preinit: preinit
  },
  scriptRegex = /(<\/|<)(s)(cript)/gi;
function scriptReplacer(match, prefix, s, suffix) {
  return "" + prefix + ("s" === s ? "\\u0073" : "\\u0053") + suffix;
}
function createFormatContext(insertionMode, selectedValue, noscriptTagInScope) {
  return {
    insertionMode: insertionMode,
    selectedValue: selectedValue,
    noscriptTagInScope: noscriptTagInScope
  };
}
function getChildFormatContext(parentContext, type, props) {
  switch (type) {
    case "noscript":
      return createFormatContext(2, null, !0);
    case "select":
      return createFormatContext(
        2,
        null != props.value ? props.value : props.defaultValue,
        parentContext.noscriptTagInScope
      );
    case "svg":
      return createFormatContext(3, null, parentContext.noscriptTagInScope);
    case "math":
      return createFormatContext(4, null, parentContext.noscriptTagInScope);
    case "foreignObject":
      return createFormatContext(2, null, parentContext.noscriptTagInScope);
    case "table":
      return createFormatContext(5, null, parentContext.noscriptTagInScope);
    case "thead":
    case "tbody":
    case "tfoot":
      return createFormatContext(6, null, parentContext.noscriptTagInScope);
    case "colgroup":
      return createFormatContext(8, null, parentContext.noscriptTagInScope);
    case "tr":
      return createFormatContext(7, null, parentContext.noscriptTagInScope);
  }
  return 5 <= parentContext.insertionMode
    ? createFormatContext(2, null, parentContext.noscriptTagInScope)
    : 0 === parentContext.insertionMode
    ? "html" === type
      ? createFormatContext(1, null, !1)
      : createFormatContext(2, null, !1)
    : 1 === parentContext.insertionMode
    ? createFormatContext(2, null, !1)
    : parentContext;
}
function pushTextInstance(target, text, responseState, textEmbedded) {
  if ("" === text) return textEmbedded;
  textEmbedded && target.push("\x3c!-- --\x3e");
  target.push(escapeTextForBrowser(text));
  return !0;
}
var styleNameCache = new Map();
function pushStyleAttribute(target, style) {
  if ("object" !== typeof style)
    throw Error(
      "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
    );
  var isFirst = !0,
    styleName;
  for (styleName in style)
    if (hasOwnProperty.call(style, styleName)) {
      var styleValue = style[styleName];
      if (
        null != styleValue &&
        "boolean" !== typeof styleValue &&
        "" !== styleValue
      ) {
        if (0 === styleName.indexOf("--")) {
          var nameChunk = escapeTextForBrowser(styleName);
          styleValue = escapeTextForBrowser(("" + styleValue).trim());
        } else
          (nameChunk = styleNameCache.get(styleName)),
            void 0 === nameChunk &&
              ((nameChunk = escapeTextForBrowser(
                styleName
                  .replace(uppercasePattern, "-$1")
                  .toLowerCase()
                  .replace(msPattern, "-ms-")
              )),
              styleNameCache.set(styleName, nameChunk)),
            (styleValue =
              "number" === typeof styleValue
                ? 0 === styleValue || unitlessNumbers.has(styleName)
                  ? "" + styleValue
                  : styleValue + "px"
                : escapeTextForBrowser(("" + styleValue).trim()));
        isFirst
          ? ((isFirst = !1),
            target.push(' style="', nameChunk, ":", styleValue))
          : target.push(";", nameChunk, ":", styleValue);
      }
    }
  isFirst || target.push('"');
}
function pushBooleanAttribute(target, name, value) {
  value &&
    "function" !== typeof value &&
    "symbol" !== typeof value &&
    target.push(" ", name, '=""');
}
function pushStringAttribute(target, name, value) {
  "function" !== typeof value &&
    "symbol" !== typeof value &&
    "boolean" !== typeof value &&
    target.push(" ", name, '="', escapeTextForBrowser(value), '"');
}
escapeTextForBrowser(
  "javascript:throw new Error('A React form was unexpectedly submitted.')"
);
function pushAdditionalFormField(value, key) {
  this.push('<input type="hidden"');
  if ("string" !== typeof value)
    throw Error(
      "File/Blob fields are not yet supported in progressive forms. It probably means you are closing over binary data or FormData in a Server Action."
    );
  pushStringAttribute(this, "name", key);
  pushStringAttribute(this, "value", value);
  this.push("/>");
}
function pushFormActionAttribute(
  target,
  responseState,
  formAction,
  formEncType,
  formMethod,
  formTarget,
  name
) {
  null != name && pushAttribute(target, "name", name);
  null != formAction && pushAttribute(target, "formAction", formAction);
  null != formEncType && pushAttribute(target, "formEncType", formEncType);
  null != formMethod && pushAttribute(target, "formMethod", formMethod);
  null != formTarget && pushAttribute(target, "formTarget", formTarget);
  return null;
}
function pushAttribute(target, name, value) {
  switch (name) {
    case "className":
      pushStringAttribute(target, "class", value);
      break;
    case "tabIndex":
      pushStringAttribute(target, "tabindex", value);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      pushStringAttribute(target, name, value);
      break;
    case "style":
      pushStyleAttribute(target, value);
      break;
    case "src":
    case "href":
      if ("" === value) break;
    case "action":
    case "formAction":
      if (
        null == value ||
        "function" === typeof value ||
        "symbol" === typeof value ||
        "boolean" === typeof value
      )
        break;
      value = sanitizeURL("" + value);
      target.push(" ", name, '="', escapeTextForBrowser(value), '"');
      break;
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
      break;
    case "autoFocus":
    case "multiple":
    case "muted":
      pushBooleanAttribute(target, name.toLowerCase(), value);
      break;
    case "xlinkHref":
      if (
        "function" === typeof value ||
        "symbol" === typeof value ||
        "boolean" === typeof value
      )
        break;
      value = sanitizeURL("" + value);
      target.push(" ", "xlink:href", '="', escapeTextForBrowser(value), '"');
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      "function" !== typeof value &&
        "symbol" !== typeof value &&
        target.push(" ", name, '="', escapeTextForBrowser(value), '"');
      break;
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      value &&
        "function" !== typeof value &&
        "symbol" !== typeof value &&
        target.push(" ", name, '=""');
      break;
    case "capture":
    case "download":
      !0 === value
        ? target.push(" ", name, '=""')
        : !1 !== value &&
          "function" !== typeof value &&
          "symbol" !== typeof value &&
          target.push(" ", name, '="', escapeTextForBrowser(value), '"');
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      "function" !== typeof value &&
        "symbol" !== typeof value &&
        !isNaN(value) &&
        1 <= value &&
        target.push(" ", name, '="', escapeTextForBrowser(value), '"');
      break;
    case "rowSpan":
    case "start":
      "function" === typeof value ||
        "symbol" === typeof value ||
        isNaN(value) ||
        target.push(" ", name, '="', escapeTextForBrowser(value), '"');
      break;
    case "xlinkActuate":
      pushStringAttribute(target, "xlink:actuate", value);
      break;
    case "xlinkArcrole":
      pushStringAttribute(target, "xlink:arcrole", value);
      break;
    case "xlinkRole":
      pushStringAttribute(target, "xlink:role", value);
      break;
    case "xlinkShow":
      pushStringAttribute(target, "xlink:show", value);
      break;
    case "xlinkTitle":
      pushStringAttribute(target, "xlink:title", value);
      break;
    case "xlinkType":
      pushStringAttribute(target, "xlink:type", value);
      break;
    case "xmlBase":
      pushStringAttribute(target, "xml:base", value);
      break;
    case "xmlLang":
      pushStringAttribute(target, "xml:lang", value);
      break;
    case "xmlSpace":
      pushStringAttribute(target, "xml:space", value);
      break;
    default:
      if (
        !(2 < name.length) ||
        ("o" !== name[0] && "O" !== name[0]) ||
        ("n" !== name[1] && "N" !== name[1])
      )
        if (((name = aliases.get(name) || name), isAttributeNameSafe(name))) {
          switch (typeof value) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              var prefix = name.toLowerCase().slice(0, 5);
              if ("data-" !== prefix && "aria-" !== prefix) return;
          }
          target.push(" ", name, '="', escapeTextForBrowser(value), '"');
        }
  }
}
function pushInnerHTML(target, innerHTML, children) {
  if (null != innerHTML) {
    if (null != children)
      throw Error(
        "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
      );
    if ("object" !== typeof innerHTML || !("__html" in innerHTML))
      throw Error(
        "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information."
      );
    innerHTML = innerHTML.__html;
    null !== innerHTML && void 0 !== innerHTML && target.push("" + innerHTML);
  }
}
function flattenOptionChildren(children) {
  var content = "";
  React.Children.forEach(children, function (child) {
    null != child && (content += child);
  });
  return content;
}
function pushLink(
  target,
  props,
  responseState,
  resources,
  textEmbedded,
  insertionMode,
  noscriptTagInScope
) {
  var rel = props.rel,
    href = props.href,
    precedence = props.precedence;
  if (
    3 === insertionMode ||
    noscriptTagInScope ||
    null != props.itemProp ||
    "string" !== typeof rel ||
    "string" !== typeof href ||
    "" === href
  )
    return pushLinkImpl(target, props), null;
  if ("stylesheet" === props.rel) {
    responseState = "[style]" + href;
    if (
      "string" !== typeof precedence ||
      null != props.disabled ||
      props.onLoad ||
      props.onError
    )
      return (
        (textEmbedded = resources.preloadsMap.get(responseState)),
        textEmbedded ||
          ((textEmbedded = {
            type: "preload",
            chunks: [],
            state: 0,
            props: preloadAsStylePropsFromProps(href, props)
          }),
          resources.preloadsMap.set(responseState, textEmbedded)),
        pushLinkImpl(textEmbedded.chunks, textEmbedded.props),
        resources.usedStylesheets.add(textEmbedded),
        pushLinkImpl(target, props)
      );
    href = resources.stylesMap.get(responseState);
    href ||
      ((props = assign({}, props, {
        "data-precedence": props.precedence,
        precedence: null
      })),
      (href = resources.preloadsMap.get(responseState)),
      (insertionMode = 0),
      href &&
        ((href.state |= 4),
        (noscriptTagInScope = href.props),
        null == props.crossOrigin &&
          (props.crossOrigin = noscriptTagInScope.crossOrigin),
        null == props.integrity &&
          (props.integrity = noscriptTagInScope.integrity),
        href.state & 3 && (insertionMode = 8)),
      (href = {
        type: "stylesheet",
        chunks: [],
        state: insertionMode,
        props: props
      }),
      resources.stylesMap.set(responseState, href),
      (props = resources.precedences.get(precedence)),
      props ||
        ((props = new Set()),
        resources.precedences.set(precedence, props),
        (responseState = {
          type: "style",
          chunks: [],
          state: 0,
          props: { precedence: precedence, hrefs: [] }
        }),
        props.add(responseState),
        resources.stylePrecedences.set(precedence, responseState)),
      props.add(href));
    resources.boundaryResources && resources.boundaryResources.add(href);
    textEmbedded && target.push("\x3c!-- --\x3e");
    return null;
  }
  if (props.onLoad || props.onError) return pushLinkImpl(target, props);
  textEmbedded && target.push("\x3c!-- --\x3e");
  switch (props.rel) {
    case "preconnect":
    case "dns-prefetch":
      return pushLinkImpl(responseState.preconnectChunks, props);
    case "preload":
      return pushLinkImpl(responseState.preloadChunks, props);
    default:
      return pushLinkImpl(responseState.hoistableChunks, props);
  }
}
function pushLinkImpl(target, props) {
  target.push(startChunkForTag("link"));
  for (var propKey in props)
    if (hasOwnProperty.call(props, propKey)) {
      var propValue = props[propKey];
      if (null != propValue)
        switch (propKey) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(
              "link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
            );
          default:
            pushAttribute(target, propKey, propValue);
        }
    }
  target.push("/>");
  return null;
}
function pushSelfClosing(target, props, tag) {
  target.push(startChunkForTag(tag));
  for (var propKey in props)
    if (hasOwnProperty.call(props, propKey)) {
      var propValue = props[propKey];
      if (null != propValue)
        switch (propKey) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(
              tag +
                " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
            );
          default:
            pushAttribute(target, propKey, propValue);
        }
    }
  target.push("/>");
  return null;
}
function pushTitleImpl(target, props) {
  target.push(startChunkForTag("title"));
  var children = null,
    innerHTML = null,
    propKey;
  for (propKey in props)
    if (hasOwnProperty.call(props, propKey)) {
      var propValue = props[propKey];
      if (null != propValue)
        switch (propKey) {
          case "children":
            children = propValue;
            break;
          case "dangerouslySetInnerHTML":
            innerHTML = propValue;
            break;
          default:
            pushAttribute(target, propKey, propValue);
        }
    }
  target.push(">");
  props = Array.isArray(children)
    ? 2 > children.length
      ? children[0]
      : null
    : children;
  "function" !== typeof props &&
    "symbol" !== typeof props &&
    null !== props &&
    void 0 !== props &&
    target.push(escapeTextForBrowser("" + props));
  pushInnerHTML(target, innerHTML, children);
  target.push("</", "title", ">");
  return null;
}
function pushScriptImpl(target, props) {
  target.push(startChunkForTag("script"));
  var children = null,
    innerHTML = null,
    propKey;
  for (propKey in props)
    if (hasOwnProperty.call(props, propKey)) {
      var propValue = props[propKey];
      if (null != propValue)
        switch (propKey) {
          case "children":
            children = propValue;
            break;
          case "dangerouslySetInnerHTML":
            innerHTML = propValue;
            break;
          default:
            pushAttribute(target, propKey, propValue);
        }
    }
  target.push(">");
  pushInnerHTML(target, innerHTML, children);
  "string" === typeof children && target.push(escapeTextForBrowser(children));
  target.push("</", "script", ">");
  return null;
}
function pushStartGenericElement(target, props, tag) {
  target.push(startChunkForTag(tag));
  var innerHTML = (tag = null),
    propKey;
  for (propKey in props)
    if (hasOwnProperty.call(props, propKey)) {
      var propValue = props[propKey];
      if (null != propValue)
        switch (propKey) {
          case "children":
            tag = propValue;
            break;
          case "dangerouslySetInnerHTML":
            innerHTML = propValue;
            break;
          default:
            pushAttribute(target, propKey, propValue);
        }
    }
  target.push(">");
  pushInnerHTML(target, innerHTML, tag);
  return "string" === typeof tag
    ? (target.push(escapeTextForBrowser(tag)), null)
    : tag;
}
var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
  validatedTagCache = new Map();
function startChunkForTag(tag) {
  var tagStartChunk = validatedTagCache.get(tag);
  if (void 0 === tagStartChunk) {
    if (!VALID_TAG_REGEX.test(tag)) throw Error("Invalid tag: " + tag);
    tagStartChunk = "<" + tag;
    validatedTagCache.set(tag, tagStartChunk);
  }
  return tagStartChunk;
}
function pushStartInstance(
  target,
  type,
  props,
  resources,
  responseState,
  formatContext,
  textEmbedded
) {
  switch (type) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "select":
      target.push(startChunkForTag("select"));
      textEmbedded = responseState = null;
      for (var propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                responseState = propValue;
                break;
              case "dangerouslySetInnerHTML":
                textEmbedded = propValue;
                break;
              case "defaultValue":
              case "value":
                break;
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push(">");
      pushInnerHTML(target, textEmbedded, responseState);
      return responseState;
    case "option":
      responseState = formatContext.selectedValue;
      target.push(startChunkForTag("option"));
      var selected = (resources = textEmbedded = null);
      propValue = null;
      for (var propKey$jscomp$0 in props)
        if (hasOwnProperty.call(props, propKey$jscomp$0)) {
          var propValue$jscomp$0 = props[propKey$jscomp$0];
          if (null != propValue$jscomp$0)
            switch (propKey$jscomp$0) {
              case "children":
                textEmbedded = propValue$jscomp$0;
                break;
              case "selected":
                selected = propValue$jscomp$0;
                break;
              case "dangerouslySetInnerHTML":
                propValue = propValue$jscomp$0;
                break;
              case "value":
                resources = propValue$jscomp$0;
              default:
                pushAttribute(target, propKey$jscomp$0, propValue$jscomp$0);
            }
        }
      if (null != responseState)
        if (
          ((props =
            null !== resources
              ? "" + resources
              : flattenOptionChildren(textEmbedded)),
          isArrayImpl(responseState))
        )
          for (resources = 0; resources < responseState.length; resources++) {
            if ("" + responseState[resources] === props) {
              target.push(' selected=""');
              break;
            }
          }
        else "" + responseState === props && target.push(' selected=""');
      else selected && target.push(' selected=""');
      target.push(">");
      pushInnerHTML(target, propValue, textEmbedded);
      return textEmbedded;
    case "textarea":
      target.push(startChunkForTag("textarea"));
      propValue = textEmbedded = responseState = null;
      for (var propKey$jscomp$1 in props)
        if (
          hasOwnProperty.call(props, propKey$jscomp$1) &&
          ((resources = props[propKey$jscomp$1]), null != resources)
        )
          switch (propKey$jscomp$1) {
            case "children":
              propValue = resources;
              break;
            case "value":
              responseState = resources;
              break;
            case "defaultValue":
              textEmbedded = resources;
              break;
            case "dangerouslySetInnerHTML":
              throw Error(
                "`dangerouslySetInnerHTML` does not make sense on <textarea>."
              );
            default:
              pushAttribute(target, propKey$jscomp$1, resources);
          }
      null === responseState &&
        null !== textEmbedded &&
        (responseState = textEmbedded);
      target.push(">");
      if (null != propValue) {
        if (null != responseState)
          throw Error(
            "If you supply `defaultValue` on a <textarea>, do not pass children."
          );
        if (isArrayImpl(propValue) && 1 < propValue.length)
          throw Error("<textarea> can only have at most one child.");
        responseState = "" + propValue;
      }
      "string" === typeof responseState &&
        "\n" === responseState[0] &&
        target.push("\n");
      null !== responseState &&
        target.push(escapeTextForBrowser("" + responseState));
      return null;
    case "input":
      target.push(startChunkForTag("input"));
      var name = null,
        formEncType = (propKey$jscomp$0 = null);
      propValue$jscomp$0 =
        selected =
        resources =
        textEmbedded =
        propKey =
        propKey$jscomp$1 =
          null;
      for (propValue in props)
        if (hasOwnProperty.call(props, propValue)) {
          var propValue$jscomp$1 = props[propValue];
          if (null != propValue$jscomp$1)
            switch (propValue) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(
                  "input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                );
              case "name":
                name = propValue$jscomp$1;
                break;
              case "formAction":
                propKey$jscomp$0 = propValue$jscomp$1;
                break;
              case "formEncType":
                formEncType = propValue$jscomp$1;
                break;
              case "formMethod":
                propKey$jscomp$1 = propValue$jscomp$1;
                break;
              case "formTarget":
                propKey = propValue$jscomp$1;
                break;
              case "defaultChecked":
                propValue$jscomp$0 = propValue$jscomp$1;
                break;
              case "defaultValue":
                resources = propValue$jscomp$1;
                break;
              case "checked":
                selected = propValue$jscomp$1;
                break;
              case "value":
                textEmbedded = propValue$jscomp$1;
                break;
              default:
                pushAttribute(target, propValue, propValue$jscomp$1);
            }
        }
      props = pushFormActionAttribute(
        target,
        responseState,
        propKey$jscomp$0,
        formEncType,
        propKey$jscomp$1,
        propKey,
        name
      );
      null !== selected
        ? pushBooleanAttribute(target, "checked", selected)
        : null !== propValue$jscomp$0 &&
          pushBooleanAttribute(target, "checked", propValue$jscomp$0);
      null !== textEmbedded
        ? pushAttribute(target, "value", textEmbedded)
        : null !== resources && pushAttribute(target, "value", resources);
      target.push("/>");
      null !== props && props.forEach(pushAdditionalFormField, target);
      return null;
    case "button":
      target.push(startChunkForTag("button"));
      formEncType =
        propKey$jscomp$0 =
        name =
        selected =
        resources =
        propValue =
        textEmbedded =
          null;
      for (propValue$jscomp$0 in props)
        if (
          hasOwnProperty.call(props, propValue$jscomp$0) &&
          ((propKey$jscomp$1 = props[propValue$jscomp$0]),
          null != propKey$jscomp$1)
        )
          switch (propValue$jscomp$0) {
            case "children":
              textEmbedded = propKey$jscomp$1;
              break;
            case "dangerouslySetInnerHTML":
              propValue = propKey$jscomp$1;
              break;
            case "name":
              resources = propKey$jscomp$1;
              break;
            case "formAction":
              selected = propKey$jscomp$1;
              break;
            case "formEncType":
              name = propKey$jscomp$1;
              break;
            case "formMethod":
              propKey$jscomp$0 = propKey$jscomp$1;
              break;
            case "formTarget":
              formEncType = propKey$jscomp$1;
              break;
            default:
              pushAttribute(target, propValue$jscomp$0, propKey$jscomp$1);
          }
      props = pushFormActionAttribute(
        target,
        responseState,
        selected,
        name,
        propKey$jscomp$0,
        formEncType,
        resources
      );
      target.push(">");
      null !== props && props.forEach(pushAdditionalFormField, target);
      pushInnerHTML(target, propValue, textEmbedded);
      "string" === typeof textEmbedded
        ? (target.push(escapeTextForBrowser(textEmbedded)), (target = null))
        : (target = textEmbedded);
      return target;
    case "form":
      target.push(startChunkForTag("form"));
      propValue$jscomp$0 =
        selected =
        resources =
        propValue =
        textEmbedded =
        responseState =
          null;
      for (name in props)
        if (
          hasOwnProperty.call(props, name) &&
          ((propKey$jscomp$0 = props[name]), null != propKey$jscomp$0)
        )
          switch (name) {
            case "children":
              responseState = propKey$jscomp$0;
              break;
            case "dangerouslySetInnerHTML":
              textEmbedded = propKey$jscomp$0;
              break;
            case "action":
              propValue = propKey$jscomp$0;
              break;
            case "encType":
              resources = propKey$jscomp$0;
              break;
            case "method":
              selected = propKey$jscomp$0;
              break;
            case "target":
              propValue$jscomp$0 = propKey$jscomp$0;
              break;
            default:
              pushAttribute(target, name, propKey$jscomp$0);
          }
      null != propValue && pushAttribute(target, "action", propValue);
      null != resources && pushAttribute(target, "encType", resources);
      null != selected && pushAttribute(target, "method", selected);
      null != propValue$jscomp$0 &&
        pushAttribute(target, "target", propValue$jscomp$0);
      target.push(">");
      pushInnerHTML(target, textEmbedded, responseState);
      "string" === typeof responseState
        ? (target.push(escapeTextForBrowser(responseState)), (target = null))
        : (target = responseState);
      return target;
    case "menuitem":
      target.push(startChunkForTag("menuitem"));
      for (var propKey$jscomp$2 in props)
        if (
          hasOwnProperty.call(props, propKey$jscomp$2) &&
          ((responseState = props[propKey$jscomp$2]), null != responseState)
        )
          switch (propKey$jscomp$2) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(
                "menuitems cannot have `children` nor `dangerouslySetInnerHTML`."
              );
            default:
              pushAttribute(target, propKey$jscomp$2, responseState);
          }
      target.push(">");
      return null;
    case "title":
      return (
        3 === formatContext.insertionMode ||
        formatContext.noscriptTagInScope ||
        null != props.itemProp
          ? (target = pushTitleImpl(target, props))
          : (pushTitleImpl(responseState.hoistableChunks, props),
            (target = null)),
        target
      );
    case "link":
      return pushLink(
        target,
        props,
        responseState,
        resources,
        textEmbedded,
        formatContext.insertionMode,
        formatContext.noscriptTagInScope
      );
    case "script":
      a: if (
        3 === formatContext.insertionMode ||
        formatContext.noscriptTagInScope ||
        null != props.itemProp ||
        "string" !== typeof props.src ||
        !props.src
      )
        target = pushScriptImpl(target, props);
      else {
        selected = "[script]" + props.src;
        if (!0 !== props.async || props.onLoad || props.onError) {
          if (
            (!0 !== props.noModule &&
              ((responseState = resources.preloadsMap.get(selected)),
              responseState ||
                ((responseState = {
                  type: "preload",
                  chunks: [],
                  state: 0,
                  props: {
                    rel: "preload",
                    as: "script",
                    href: props.src,
                    crossOrigin: props.crossOrigin,
                    integrity: props.integrity,
                    referrerPolicy: props.referrerPolicy
                  }
                }),
                resources.preloadsMap.set(selected, responseState),
                resources.usedScripts.add(responseState),
                pushLinkImpl(responseState.chunks, responseState.props))),
            !0 !== props.async)
          ) {
            pushScriptImpl(target, props);
            target = null;
            break a;
          }
        } else if (
          ((responseState = resources.scriptsMap.get(selected)), !responseState)
        ) {
          responseState = { type: "script", chunks: [], state: 0, props: null };
          resources.scriptsMap.set(selected, responseState);
          resources.scripts.add(responseState);
          propValue = props;
          if ((resources = resources.preloadsMap.get(selected)))
            (resources.state |= 4),
              (props = propValue = assign({}, props)),
              (resources = resources.props),
              null == props.crossOrigin &&
                (props.crossOrigin = resources.crossOrigin),
              null == props.integrity &&
                (props.integrity = resources.integrity);
          pushScriptImpl(responseState.chunks, propValue);
        }
        textEmbedded && target.push("\x3c!-- --\x3e");
        target = null;
      }
      return target;
    case "style":
      responseState = props.precedence;
      propValue = props.href;
      if (
        3 === formatContext.insertionMode ||
        formatContext.noscriptTagInScope ||
        null != props.itemProp ||
        "string" !== typeof responseState ||
        "string" !== typeof propValue ||
        "" === propValue
      ) {
        target.push(startChunkForTag("style"));
        textEmbedded = responseState = null;
        for (formEncType in props)
          if (
            hasOwnProperty.call(props, formEncType) &&
            ((propValue = props[formEncType]), null != propValue)
          )
            switch (formEncType) {
              case "children":
                responseState = propValue;
                break;
              case "dangerouslySetInnerHTML":
                textEmbedded = propValue;
                break;
              default:
                pushAttribute(target, formEncType, propValue);
            }
        target.push(">");
        props = Array.isArray(responseState)
          ? 2 > responseState.length
            ? responseState[0]
            : null
          : responseState;
        "function" !== typeof props &&
          "symbol" !== typeof props &&
          null !== props &&
          void 0 !== props &&
          target.push(escapeTextForBrowser("" + props));
        pushInnerHTML(target, textEmbedded, responseState);
        target.push("</", "style", ">");
        target = null;
      } else {
        propValue$jscomp$0 = "[style]" + propValue;
        name = resources.stylesMap.get(propValue$jscomp$0);
        if (!name) {
          (name = resources.stylePrecedences.get(responseState))
            ? name.props.hrefs.push(propValue)
            : ((name = {
                type: "style",
                chunks: [],
                state: 0,
                props: { precedence: responseState, hrefs: [propValue] }
              }),
              resources.stylePrecedences.set(responseState, name),
              (propValue = new Set()),
              propValue.add(name),
              resources.precedences.set(responseState, propValue));
          resources.stylesMap.set(propValue$jscomp$0, name);
          resources.boundaryResources && resources.boundaryResources.add(name);
          responseState = name.chunks;
          resources = propValue = null;
          for (selected in props)
            if (
              hasOwnProperty.call(props, selected) &&
              ((propValue$jscomp$0 = props[selected]),
              null != propValue$jscomp$0)
            )
              switch (selected) {
                case "children":
                  propValue = propValue$jscomp$0;
                  break;
                case "dangerouslySetInnerHTML":
                  resources = propValue$jscomp$0;
              }
          props = Array.isArray(propValue)
            ? 2 > propValue.length
              ? propValue[0]
              : null
            : propValue;
          "function" !== typeof props &&
            "symbol" !== typeof props &&
            null !== props &&
            void 0 !== props &&
            responseState.push(escapeTextForBrowser("" + props));
          pushInnerHTML(responseState, resources, propValue);
        }
        textEmbedded && target.push("\x3c!-- --\x3e");
        target = void 0;
      }
      return target;
    case "meta":
      return (
        3 === formatContext.insertionMode ||
        formatContext.noscriptTagInScope ||
        null != props.itemProp
          ? (target = pushSelfClosing(target, props, "meta"))
          : (textEmbedded && target.push("\x3c!-- --\x3e"),
            (target =
              "string" === typeof props.charSet
                ? pushSelfClosing(responseState.charsetChunks, props, "meta")
                : pushSelfClosing(
                    responseState.hoistableChunks,
                    props,
                    "meta"
                  ))),
        target
      );
    case "listing":
    case "pre":
      target.push(startChunkForTag(type));
      textEmbedded = responseState = null;
      for (propValue$jscomp$1 in props)
        if (
          hasOwnProperty.call(props, propValue$jscomp$1) &&
          ((propValue = props[propValue$jscomp$1]), null != propValue)
        )
          switch (propValue$jscomp$1) {
            case "children":
              responseState = propValue;
              break;
            case "dangerouslySetInnerHTML":
              textEmbedded = propValue;
              break;
            default:
              pushAttribute(target, propValue$jscomp$1, propValue);
          }
      target.push(">");
      if (null != textEmbedded) {
        if (null != responseState)
          throw Error(
            "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
          );
        if ("object" !== typeof textEmbedded || !("__html" in textEmbedded))
          throw Error(
            "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information."
          );
        props = textEmbedded.__html;
        null !== props &&
          void 0 !== props &&
          ("string" === typeof props && 0 < props.length && "\n" === props[0]
            ? target.push("\n", props)
            : target.push("" + props));
      }
      "string" === typeof responseState &&
        "\n" === responseState[0] &&
        target.push("\n");
      return responseState;
    case "base":
    case "area":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "img":
    case "keygen":
    case "param":
    case "source":
    case "track":
    case "wbr":
      return pushSelfClosing(target, props, type);
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      break;
    case "head":
      return (
        2 > formatContext.insertionMode && null === responseState.headChunks
          ? ((responseState.headChunks = []),
            (target = pushStartGenericElement(
              responseState.headChunks,
              props,
              "head"
            )))
          : (target = pushStartGenericElement(target, props, "head")),
        target
      );
    case "html":
      return (
        0 === formatContext.insertionMode && null === responseState.htmlChunks
          ? ((responseState.htmlChunks = ["<!DOCTYPE html>"]),
            (target = pushStartGenericElement(
              responseState.htmlChunks,
              props,
              "html"
            )))
          : (target = pushStartGenericElement(target, props, "html")),
        target
      );
    default:
      if (-1 !== type.indexOf("-")) {
        target.push(startChunkForTag(type));
        textEmbedded = responseState = null;
        for (var propKey$jscomp$3 in props)
          if (
            hasOwnProperty.call(props, propKey$jscomp$3) &&
            ((propValue = props[propKey$jscomp$3]),
            !(
              null == propValue ||
              (enableCustomElementPropertySupport &&
                ("function" === typeof propValue ||
                  "object" === typeof propValue)) ||
              (enableCustomElementPropertySupport && !1 === propValue)
            ))
          )
            switch (
              (enableCustomElementPropertySupport &&
                !0 === propValue &&
                (propValue = ""),
              enableCustomElementPropertySupport &&
                "className" === propKey$jscomp$3 &&
                (propKey$jscomp$3 = "class"),
              propKey$jscomp$3)
            ) {
              case "children":
                responseState = propValue;
                break;
              case "dangerouslySetInnerHTML":
                textEmbedded = propValue;
                break;
              case "style":
                pushStyleAttribute(target, propValue);
                break;
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
                break;
              default:
                isAttributeNameSafe(propKey$jscomp$3) &&
                  "function" !== typeof propValue &&
                  "symbol" !== typeof propValue &&
                  target.push(
                    " ",
                    propKey$jscomp$3,
                    '="',
                    escapeTextForBrowser(propValue),
                    '"'
                  );
            }
        target.push(">");
        pushInnerHTML(target, textEmbedded, responseState);
        return responseState;
      }
  }
  return pushStartGenericElement(target, props, type);
}
function writeBootstrap(destination, responseState) {
  responseState = responseState.bootstrapChunks;
  for (var i = 0; i < responseState.length - 1; i++)
    destination.buffer += responseState[i];
  return i < responseState.length
    ? ((i = responseState[i]),
      (responseState.length = 0),
      writeChunkAndReturn(destination, i))
    : !0;
}
function writeStartPendingSuspenseBoundary(destination, responseState, id) {
  destination.buffer += '\x3c!--$?--\x3e<template id="';
  if (null === id)
    throw Error(
      "An ID must have been assigned before we can complete the boundary."
    );
  destination.buffer += id;
  return writeChunkAndReturn(destination, '"></template>');
}
function writeStartSegment(destination, responseState, formatContext, id) {
  switch (formatContext.insertionMode) {
    case 0:
    case 1:
    case 2:
      return (
        (destination.buffer += '<div hidden id="'),
        (destination.buffer += responseState.segmentPrefix),
        (responseState = id.toString(16)),
        (destination.buffer += responseState),
        writeChunkAndReturn(destination, '">')
      );
    case 3:
      return (
        (destination.buffer +=
          '<svg aria-hidden="true" style="display:none" id="'),
        (destination.buffer += responseState.segmentPrefix),
        (responseState = id.toString(16)),
        (destination.buffer += responseState),
        writeChunkAndReturn(destination, '">')
      );
    case 4:
      return (
        (destination.buffer +=
          '<math aria-hidden="true" style="display:none" id="'),
        (destination.buffer += responseState.segmentPrefix),
        (responseState = id.toString(16)),
        (destination.buffer += responseState),
        writeChunkAndReturn(destination, '">')
      );
    case 5:
      return (
        (destination.buffer += '<table hidden id="'),
        (destination.buffer += responseState.segmentPrefix),
        (responseState = id.toString(16)),
        (destination.buffer += responseState),
        writeChunkAndReturn(destination, '">')
      );
    case 6:
      return (
        (destination.buffer += '<table hidden><tbody id="'),
        (destination.buffer += responseState.segmentPrefix),
        (responseState = id.toString(16)),
        (destination.buffer += responseState),
        writeChunkAndReturn(destination, '">')
      );
    case 7:
      return (
        (destination.buffer += '<table hidden><tr id="'),
        (destination.buffer += responseState.segmentPrefix),
        (responseState = id.toString(16)),
        (destination.buffer += responseState),
        writeChunkAndReturn(destination, '">')
      );
    case 8:
      return (
        (destination.buffer += '<table hidden><colgroup id="'),
        (destination.buffer += responseState.segmentPrefix),
        (responseState = id.toString(16)),
        (destination.buffer += responseState),
        writeChunkAndReturn(destination, '">')
      );
    default:
      throw Error("Unknown insertion mode. This is a bug in React.");
  }
}
function writeEndSegment(destination, formatContext) {
  switch (formatContext.insertionMode) {
    case 0:
    case 1:
    case 2:
      return writeChunkAndReturn(destination, "</div>");
    case 3:
      return writeChunkAndReturn(destination, "</svg>");
    case 4:
      return writeChunkAndReturn(destination, "</math>");
    case 5:
      return writeChunkAndReturn(destination, "</table>");
    case 6:
      return writeChunkAndReturn(destination, "</tbody></table>");
    case 7:
      return writeChunkAndReturn(destination, "</tr></table>");
    case 8:
      return writeChunkAndReturn(destination, "</colgroup></table>");
    default:
      throw Error("Unknown insertion mode. This is a bug in React.");
  }
}
var regexForJSStringsInInstructionScripts = /[<\u2028\u2029]/g;
function escapeJSStringsForInstructionScripts(input) {
  return JSON.stringify(input).replace(
    regexForJSStringsInInstructionScripts,
    function (match) {
      switch (match) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error(
            "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
          );
      }
    }
  );
}
var regexForJSStringsInScripts = /[&><\u2028\u2029]/g;
function escapeJSObjectForInstructionScripts(input) {
  return JSON.stringify(input).replace(
    regexForJSStringsInScripts,
    function (match) {
      switch (match) {
        case "&":
          return "\\u0026";
        case ">":
          return "\\u003e";
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error(
            "escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
          );
      }
    }
  );
}
var currentlyRenderingBoundaryHasStylesToHoist = !1,
  destinationHasCapacity = !0;
function flushStyleTagsLateForBoundary(resource) {
  if ("stylesheet" === resource.type && 0 === (resource.state & 1))
    currentlyRenderingBoundaryHasStylesToHoist = !0;
  else if ("style" === resource.type) {
    var chunks = resource.chunks,
      hrefs = resource.props.hrefs,
      i = 0;
    if (chunks.length) {
      this.buffer += '<style media="not all" data-precedence="';
      resource = escapeTextForBrowser(resource.props.precedence);
      this.buffer += resource;
      if (hrefs.length) {
        for (this.buffer += '" data-href="'; i < hrefs.length - 1; i++)
          (resource = escapeTextForBrowser(hrefs[i])),
            (this.buffer += resource),
            (this.buffer += " ");
        i = escapeTextForBrowser(hrefs[i]);
        this.buffer += i;
      }
      this.buffer += '">';
      for (i = 0; i < chunks.length; i++) this.buffer += chunks[i];
      destinationHasCapacity = writeChunkAndReturn(this, "</style>");
      currentlyRenderingBoundaryHasStylesToHoist = !0;
      chunks.length = 0;
      hrefs.length = 0;
    }
  }
}
function writeResourcesForBoundary(
  destination,
  boundaryResources,
  responseState
) {
  currentlyRenderingBoundaryHasStylesToHoist = !1;
  destinationHasCapacity = !0;
  boundaryResources.forEach(flushStyleTagsLateForBoundary, destination);
  currentlyRenderingBoundaryHasStylesToHoist &&
    (responseState.stylesToHoist = !0);
  return destinationHasCapacity;
}
function flushResourceInPreamble(resource) {
  if (0 === (resource.state & 7)) {
    for (var chunks = resource.chunks, i = 0; i < chunks.length; i++)
      this.buffer += chunks[i];
    resource.state |= 1;
  }
}
function flushResourceLate(resource) {
  if (0 === (resource.state & 7)) {
    for (var chunks = resource.chunks, i = 0; i < chunks.length; i++)
      this.buffer += chunks[i];
    resource.state |= 2;
  }
}
var precedenceStyleTagResource = null,
  didFlushPrecedence = !1;
function flushStyleInPreamble(resource, key, set) {
  key = resource.chunks;
  if (resource.state & 3) set.delete(resource);
  else if ("style" === resource.type) precedenceStyleTagResource = resource;
  else {
    pushLinkImpl(key, resource.props);
    for (set = 0; set < key.length; set++) this.buffer += key[set];
    resource.state |= 1;
    didFlushPrecedence = !0;
  }
}
function flushAllStylesInPreamble(set, precedence) {
  didFlushPrecedence = !1;
  set.forEach(flushStyleInPreamble, this);
  set.clear();
  set = precedenceStyleTagResource.chunks;
  var hrefs = precedenceStyleTagResource.props.hrefs;
  if (!1 === didFlushPrecedence || set.length) {
    this.buffer += '<style data-precedence="';
    precedence = escapeTextForBrowser(precedence);
    this.buffer += precedence;
    precedence = 0;
    if (hrefs.length) {
      for (
        this.buffer += '" data-href="';
        precedence < hrefs.length - 1;
        precedence++
      ) {
        var chunk = escapeTextForBrowser(hrefs[precedence]);
        this.buffer += chunk;
        this.buffer += " ";
      }
      precedence = escapeTextForBrowser(hrefs[precedence]);
      this.buffer += precedence;
    }
    this.buffer += '">';
    for (precedence = 0; precedence < set.length; precedence++)
      this.buffer += set[precedence];
    this.buffer += "</style>";
    set.length = 0;
    hrefs.length = 0;
  }
}
function preloadLateStyle(resource) {
  if (!(resource.state & 8) && "style" !== resource.type) {
    var chunks = resource.chunks,
      preloadProps = preloadAsStylePropsFromProps(
        resource.props.href,
        resource.props
      );
    pushLinkImpl(chunks, preloadProps);
    for (preloadProps = 0; preloadProps < chunks.length; preloadProps++)
      this.buffer += chunks[preloadProps];
    resource.state |= 8;
    chunks.length = 0;
  }
}
function preloadLateStyles(set) {
  set.forEach(preloadLateStyle, this);
  set.clear();
}
function writePreamble(
  destination,
  resources,
  responseState,
  willFlushAllSegments
) {
  !willFlushAllSegments &&
    responseState.externalRuntimeScript &&
    ((willFlushAllSegments = responseState.externalRuntimeScript),
    internalPreinitScript(
      resources,
      willFlushAllSegments.src,
      willFlushAllSegments.chunks
    ));
  willFlushAllSegments = responseState.htmlChunks;
  var headChunks = responseState.headChunks,
    i = 0;
  if (willFlushAllSegments) {
    for (i = 0; i < willFlushAllSegments.length; i++)
      destination.buffer += willFlushAllSegments[i];
    if (headChunks)
      for (i = 0; i < headChunks.length; i++)
        destination.buffer += headChunks[i];
    else
      writeChunk(destination, startChunkForTag("head")),
        (destination.buffer += ">");
  } else if (headChunks)
    for (i = 0; i < headChunks.length; i++) destination.buffer += headChunks[i];
  var charsetChunks = responseState.charsetChunks;
  for (i = 0; i < charsetChunks.length; i++)
    destination.buffer += charsetChunks[i];
  charsetChunks.length = 0;
  resources.preconnects.forEach(flushResourceInPreamble, destination);
  resources.preconnects.clear();
  charsetChunks = responseState.preconnectChunks;
  for (i = 0; i < charsetChunks.length; i++)
    destination.buffer += charsetChunks[i];
  charsetChunks.length = 0;
  resources.fontPreloads.forEach(flushResourceInPreamble, destination);
  resources.fontPreloads.clear();
  resources.precedences.forEach(flushAllStylesInPreamble, destination);
  resources.usedStylesheets.forEach(function (resource) {
    if (
      !resources.stylesMap.has(
        "[" + resource.props.as + "]" + resource.props.href
      )
    )
      for (resource = resource.chunks, i = 0; i < resource.length; i++)
        destination.buffer += resource[i];
  });
  resources.usedStylesheets.clear();
  resources.scripts.forEach(flushResourceInPreamble, destination);
  resources.scripts.clear();
  resources.usedScripts.forEach(flushResourceInPreamble, destination);
  resources.usedScripts.clear();
  resources.explicitStylesheetPreloads.forEach(
    flushResourceInPreamble,
    destination
  );
  resources.explicitStylesheetPreloads.clear();
  resources.explicitScriptPreloads.forEach(
    flushResourceInPreamble,
    destination
  );
  resources.explicitScriptPreloads.clear();
  resources.explicitOtherPreloads.forEach(flushResourceInPreamble, destination);
  resources.explicitOtherPreloads.clear();
  charsetChunks = responseState.preloadChunks;
  for (i = 0; i < charsetChunks.length; i++)
    destination.buffer += charsetChunks[i];
  charsetChunks.length = 0;
  responseState = responseState.hoistableChunks;
  for (i = 0; i < responseState.length; i++)
    destination.buffer += responseState[i];
  responseState.length = 0;
  willFlushAllSegments &&
    null === headChunks &&
    ((destination.buffer += "</"),
    writeChunk(destination, "head"),
    (destination.buffer += ">"));
}
function writeHoistables(destination, resources, responseState) {
  var i = 0;
  resources.preconnects.forEach(flushResourceLate, destination);
  resources.preconnects.clear();
  var preconnectChunks = responseState.preconnectChunks;
  for (i = 0; i < preconnectChunks.length; i++)
    destination.buffer += preconnectChunks[i];
  preconnectChunks.length = 0;
  resources.fontPreloads.forEach(flushResourceLate, destination);
  resources.fontPreloads.clear();
  resources.precedences.forEach(preloadLateStyles, destination);
  resources.usedStylesheets.forEach(function (resource) {
    if (
      !resources.stylesMap.has(
        "[" + resource.props.as + "]" + resource.props.href
      )
    )
      for (resource = resource.chunks, i = 0; i < resource.length; i++)
        destination.buffer += resource[i];
  });
  resources.usedStylesheets.clear();
  resources.scripts.forEach(flushResourceLate, destination);
  resources.scripts.clear();
  resources.usedScripts.forEach(flushResourceLate, destination);
  resources.usedScripts.clear();
  resources.explicitStylesheetPreloads.forEach(flushResourceLate, destination);
  resources.explicitStylesheetPreloads.clear();
  resources.explicitScriptPreloads.forEach(flushResourceLate, destination);
  resources.explicitScriptPreloads.clear();
  resources.explicitOtherPreloads.forEach(flushResourceLate, destination);
  resources.explicitOtherPreloads.clear();
  preconnectChunks = responseState.preloadChunks;
  for (i = 0; i < preconnectChunks.length; i++)
    destination.buffer += preconnectChunks[i];
  preconnectChunks.length = 0;
  responseState = responseState.hoistableChunks;
  for (i = 0; i < responseState.length; i++)
    destination.buffer += responseState[i];
  responseState.length = 0;
}
function writeStyleResourceDependenciesInJS(destination, boundaryResources) {
  destination.buffer += "[";
  var nextArrayOpenBrackChunk = "[";
  boundaryResources.forEach(function (resource) {
    if ("style" !== resource.type && !(resource.state & 1))
      if (resource.state & 3)
        (destination.buffer += nextArrayOpenBrackChunk),
          writeChunk(
            destination,
            escapeJSObjectForInstructionScripts("" + resource.props.href)
          ),
          (destination.buffer += "]"),
          (nextArrayOpenBrackChunk = ",[");
      else if ("stylesheet" === resource.type) {
        destination.buffer += nextArrayOpenBrackChunk;
        var precedence = resource.props["data-precedence"],
          props = resource.props,
          coercedHref = sanitizeURL("" + resource.props.href);
        writeChunk(
          destination,
          escapeJSObjectForInstructionScripts(coercedHref)
        );
        precedence = "" + precedence;
        writeChunk(destination, ",");
        writeChunk(
          destination,
          escapeJSObjectForInstructionScripts(precedence)
        );
        for (var propKey in props)
          if (
            hasOwnProperty.call(props, propKey) &&
            ((precedence = props[propKey]), null != precedence)
          )
            switch (propKey) {
              case "href":
              case "rel":
              case "precedence":
              case "data-precedence":
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(
                  "link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                );
              default:
                writeStyleResourceAttributeInJS(
                  destination,
                  propKey,
                  precedence
                );
            }
        destination.buffer += "]";
        nextArrayOpenBrackChunk = ",[";
        resource.state |= 2;
      }
  });
  destination.buffer += "]";
}
function writeStyleResourceAttributeInJS(destination, name, value) {
  var attributeName = name.toLowerCase();
  switch (typeof value) {
    case "function":
    case "symbol":
      return;
  }
  switch (name) {
    case "innerHTML":
    case "dangerouslySetInnerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "style":
      return;
    case "className":
      attributeName = "class";
      name = "" + value;
      break;
    case "hidden":
      if (!1 === value) return;
      name = "";
      break;
    case "src":
    case "href":
      value = sanitizeURL(value);
      name = "" + value;
      break;
    default:
      if (
        (2 < name.length &&
          ("o" === name[0] || "O" === name[0]) &&
          ("n" === name[1] || "N" === name[1])) ||
        !isAttributeNameSafe(name)
      )
        return;
      name = "" + value;
  }
  destination.buffer += ",";
  attributeName = escapeJSObjectForInstructionScripts(attributeName);
  destination.buffer += attributeName;
  destination.buffer += ",";
  attributeName = escapeJSObjectForInstructionScripts(name);
  destination.buffer += attributeName;
}
function writeStyleResourceDependenciesInAttr(destination, boundaryResources) {
  destination.buffer += "[";
  var nextArrayOpenBrackChunk = "[";
  boundaryResources.forEach(function (resource) {
    if ("style" !== resource.type && !(resource.state & 1))
      if (resource.state & 3)
        (destination.buffer += nextArrayOpenBrackChunk),
          writeChunk(
            destination,
            escapeTextForBrowser(JSON.stringify("" + resource.props.href))
          ),
          (destination.buffer += "]"),
          (nextArrayOpenBrackChunk = ",[");
      else if ("stylesheet" === resource.type) {
        destination.buffer += nextArrayOpenBrackChunk;
        var precedence = resource.props["data-precedence"],
          props = resource.props,
          coercedHref = sanitizeURL("" + resource.props.href);
        writeChunk(
          destination,
          escapeTextForBrowser(JSON.stringify(coercedHref))
        );
        precedence = "" + precedence;
        writeChunk(destination, ",");
        writeChunk(
          destination,
          escapeTextForBrowser(JSON.stringify(precedence))
        );
        for (var propKey in props)
          if (
            hasOwnProperty.call(props, propKey) &&
            ((precedence = props[propKey]), null != precedence)
          )
            switch (propKey) {
              case "href":
              case "rel":
              case "precedence":
              case "data-precedence":
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(
                  "link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                );
              default:
                writeStyleResourceAttributeInAttr(
                  destination,
                  propKey,
                  precedence
                );
            }
        destination.buffer += "]";
        nextArrayOpenBrackChunk = ",[";
        resource.state |= 2;
      }
  });
  destination.buffer += "]";
}
function writeStyleResourceAttributeInAttr(destination, name, value) {
  var attributeName = name.toLowerCase();
  switch (typeof value) {
    case "function":
    case "symbol":
      return;
  }
  switch (name) {
    case "innerHTML":
    case "dangerouslySetInnerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "style":
      return;
    case "className":
      attributeName = "class";
      name = "" + value;
      break;
    case "hidden":
      if (!1 === value) return;
      name = "";
      break;
    case "src":
    case "href":
      value = sanitizeURL(value);
      name = "" + value;
      break;
    default:
      if (
        (2 < name.length &&
          ("o" === name[0] || "O" === name[0]) &&
          ("n" === name[1] || "N" === name[1])) ||
        !isAttributeNameSafe(name)
      )
        return;
      name = "" + value;
  }
  destination.buffer += ",";
  attributeName = escapeTextForBrowser(JSON.stringify(attributeName));
  destination.buffer += attributeName;
  destination.buffer += ",";
  attributeName = escapeTextForBrowser(JSON.stringify(name));
  destination.buffer += attributeName;
}
function prefetchDNS(href) {
  var request = currentRequest ? currentRequest : null;
  if (request) {
    var resources = request.resources;
    if ("string" === typeof href && href) {
      var key = "[prefetchDNS]" + href,
        resource = resources.preconnectsMap.get(key);
      resource ||
        ((resource = { type: "preconnect", chunks: [], state: 0, props: null }),
        resources.preconnectsMap.set(key, resource),
        pushLinkImpl(resource.chunks, { href: href, rel: "dns-prefetch" }));
      resources.preconnects.add(resource);
      enqueueFlush(request);
    }
  }
}
function preconnect(href, options) {
  var request = currentRequest ? currentRequest : null;
  if (request) {
    var resources = request.resources;
    if ("string" === typeof href && href) {
      options =
        null == options || "string" !== typeof options.crossOrigin
          ? null
          : "use-credentials" === options.crossOrigin
          ? "use-credentials"
          : "";
      var key =
          "[preconnect][" + (null === options ? "null" : options) + "]" + href,
        resource = resources.preconnectsMap.get(key);
      resource ||
        ((resource = { type: "preconnect", chunks: [], state: 0, props: null }),
        resources.preconnectsMap.set(key, resource),
        pushLinkImpl(resource.chunks, {
          rel: "preconnect",
          href: href,
          crossOrigin: options
        }));
      resources.preconnects.add(resource);
      enqueueFlush(request);
    }
  }
}
function preload(href, options) {
  var request = currentRequest ? currentRequest : null;
  if (request) {
    var resources = request.resources;
    if (
      "string" === typeof href &&
      href &&
      "object" === typeof options &&
      null !== options &&
      "string" === typeof options.as
    ) {
      var as = options.as,
        key = "[" + as + "]" + href,
        resource = resources.preloadsMap.get(key);
      resource ||
        ((resource = {
          type: "preload",
          chunks: [],
          state: 0,
          props: {
            rel: "preload",
            as: as,
            href: href,
            crossOrigin: "font" === as ? "" : options.crossOrigin,
            integrity: options.integrity,
            type: options.type
          }
        }),
        resources.preloadsMap.set(key, resource),
        pushLinkImpl(resource.chunks, resource.props));
      switch (as) {
        case "font":
          resources.fontPreloads.add(resource);
          break;
        case "style":
          resources.explicitStylesheetPreloads.add(resource);
          break;
        case "script":
          resources.explicitScriptPreloads.add(resource);
          break;
        default:
          resources.explicitOtherPreloads.add(resource);
      }
      enqueueFlush(request);
    }
  }
}
function preinit(href, options) {
  var request = currentRequest ? currentRequest : null;
  if (request) {
    var resources = request.resources;
    if (
      "string" === typeof href &&
      href &&
      "object" === typeof options &&
      null !== options
    ) {
      var as = options.as;
      switch (as) {
        case "style":
          var key = "[" + as + "]" + href,
            resource = resources.stylesMap.get(key);
          as = options.precedence || "default";
          if (!resource) {
            resource = 0;
            var preloadResource = resources.preloadsMap.get(key);
            preloadResource && preloadResource.state & 3 && (resource = 8);
            resource = {
              type: "stylesheet",
              chunks: [],
              state: resource,
              props: {
                rel: "stylesheet",
                href: href,
                "data-precedence": as,
                crossOrigin: options.crossOrigin,
                integrity: options.integrity
              }
            };
            resources.stylesMap.set(key, resource);
            href = resources.precedences.get(as);
            href ||
              ((href = new Set()),
              resources.precedences.set(as, href),
              (options = {
                type: "style",
                chunks: [],
                state: 0,
                props: { precedence: as, hrefs: [] }
              }),
              href.add(options),
              resources.stylePrecedences.set(as, options));
            href.add(resource);
            enqueueFlush(request);
          }
          break;
        case "script":
          (key = "[" + as + "]" + href),
            (as = resources.scriptsMap.get(key)),
            as ||
              ((as = { type: "script", chunks: [], state: 0, props: null }),
              resources.scriptsMap.set(key, as),
              (href = {
                src: href,
                async: !0,
                crossOrigin: options.crossOrigin,
                integrity: options.integrity,
                nonce: options.nonce
              }),
              resources.scripts.add(as),
              pushScriptImpl(as.chunks, href),
              enqueueFlush(request));
      }
    }
  }
}
function internalPreinitScript(resources, src, chunks) {
  src = "[script]" + src;
  var resource = resources.scriptsMap.get(src);
  resource ||
    ((resource = { type: "script", chunks: chunks, state: 0, props: null }),
    resources.scriptsMap.set(src, resource),
    resources.scripts.add(resource));
}
function preloadAsStylePropsFromProps(href, props) {
  return {
    rel: "preload",
    as: "style",
    href: href,
    crossOrigin: props.crossOrigin,
    integrity: props.integrity,
    media: props.media,
    hrefLang: props.hrefLang,
    referrerPolicy: props.referrerPolicy
  };
}
function hoistStyleResource(resource) {
  this.add(resource);
}
var REACT_ELEMENT_TYPE = Symbol.for("react.element"),
  REACT_PORTAL_TYPE = Symbol.for("react.portal"),
  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
  REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
  REACT_PROFILER_TYPE = Symbol.for("react.profiler"),
  REACT_PROVIDER_TYPE = Symbol.for("react.provider"),
  REACT_CONTEXT_TYPE = Symbol.for("react.context"),
  REACT_SERVER_CONTEXT_TYPE = Symbol.for("react.server_context"),
  REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
  REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
  REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
  REACT_MEMO_TYPE = Symbol.for("react.memo"),
  REACT_LAZY_TYPE = Symbol.for("react.lazy"),
  REACT_SCOPE_TYPE = Symbol.for("react.scope"),
  REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for("react.debug_trace_mode"),
  REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"),
  REACT_LEGACY_HIDDEN_TYPE = Symbol.for("react.legacy_hidden"),
  REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED = Symbol.for(
    "react.default_value"
  ),
  REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel"),
  MAYBE_ITERATOR_SYMBOL = Symbol.iterator,
  emptyContextObject = {},
  currentActiveSnapshot = null;
function popToNearestCommonAncestor(prev, next) {
  if (prev !== next) {
    prev.context._currentValue = prev.parentValue;
    prev = prev.parent;
    var parentNext = next.parent;
    if (null === prev) {
      if (null !== parentNext)
        throw Error(
          "The stacks must reach the root at the same time. This is a bug in React."
        );
    } else {
      if (null === parentNext)
        throw Error(
          "The stacks must reach the root at the same time. This is a bug in React."
        );
      popToNearestCommonAncestor(prev, parentNext);
    }
    next.context._currentValue = next.value;
  }
}
function popAllPrevious(prev) {
  prev.context._currentValue = prev.parentValue;
  prev = prev.parent;
  null !== prev && popAllPrevious(prev);
}
function pushAllNext(next) {
  var parentNext = next.parent;
  null !== parentNext && pushAllNext(parentNext);
  next.context._currentValue = next.value;
}
function popPreviousToCommonLevel(prev, next) {
  prev.context._currentValue = prev.parentValue;
  prev = prev.parent;
  if (null === prev)
    throw Error(
      "The depth must equal at least at zero before reaching the root. This is a bug in React."
    );
  prev.depth === next.depth
    ? popToNearestCommonAncestor(prev, next)
    : popPreviousToCommonLevel(prev, next);
}
function popNextToCommonLevel(prev, next) {
  var parentNext = next.parent;
  if (null === parentNext)
    throw Error(
      "The depth must equal at least at zero before reaching the root. This is a bug in React."
    );
  prev.depth === parentNext.depth
    ? popToNearestCommonAncestor(prev, parentNext)
    : popNextToCommonLevel(prev, parentNext);
  next.context._currentValue = next.value;
}
function switchContext(newSnapshot) {
  var prev = currentActiveSnapshot;
  prev !== newSnapshot &&
    (null === prev
      ? pushAllNext(newSnapshot)
      : null === newSnapshot
      ? popAllPrevious(prev)
      : prev.depth === newSnapshot.depth
      ? popToNearestCommonAncestor(prev, newSnapshot)
      : prev.depth > newSnapshot.depth
      ? popPreviousToCommonLevel(prev, newSnapshot)
      : popNextToCommonLevel(prev, newSnapshot),
    (currentActiveSnapshot = newSnapshot));
}
var classComponentUpdater = {
    isMounted: function () {
      return !1;
    },
    enqueueSetState: function (inst, payload) {
      inst = inst._reactInternals;
      null !== inst.queue && inst.queue.push(payload);
    },
    enqueueReplaceState: function (inst, payload) {
      inst = inst._reactInternals;
      inst.replace = !0;
      inst.queue = [payload];
    },
    enqueueForceUpdate: function () {}
  },
  emptyTreeContext = { id: 1, overflow: "" };
function pushTreeContext(baseContext, totalChildren, index) {
  var baseIdWithLeadingBit = baseContext.id;
  baseContext = baseContext.overflow;
  var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
  baseIdWithLeadingBit &= ~(1 << baseLength);
  index += 1;
  var length = 32 - clz32(totalChildren) + baseLength;
  if (30 < length) {
    var numberOfOverflowBits = baseLength - (baseLength % 5);
    length = (
      baseIdWithLeadingBit &
      ((1 << numberOfOverflowBits) - 1)
    ).toString(32);
    baseIdWithLeadingBit >>= numberOfOverflowBits;
    baseLength -= numberOfOverflowBits;
    return {
      id:
        (1 << (32 - clz32(totalChildren) + baseLength)) |
        (index << baseLength) |
        baseIdWithLeadingBit,
      overflow: length + baseContext
    };
  }
  return {
    id: (1 << length) | (index << baseLength) | baseIdWithLeadingBit,
    overflow: baseContext
  };
}
var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback,
  log = Math.log,
  LN2 = Math.LN2;
function clz32Fallback(x) {
  x >>>= 0;
  return 0 === x ? 32 : (31 - ((log(x) / LN2) | 0)) | 0;
}
var SuspenseException = Error(
  "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`"
);
function noop$2() {}
function trackUsedThenable(thenableState, thenable, index) {
  index = thenableState[index];
  void 0 === index
    ? thenableState.push(thenable)
    : index !== thenable && (thenable.then(noop$2, noop$2), (thenable = index));
  switch (thenable.status) {
    case "fulfilled":
      return thenable.value;
    case "rejected":
      throw thenable.reason;
    default:
      if ("string" !== typeof thenable.status)
        switch (
          ((thenableState = thenable),
          (thenableState.status = "pending"),
          thenableState.then(
            function (fulfilledValue) {
              if ("pending" === thenable.status) {
                var fulfilledThenable = thenable;
                fulfilledThenable.status = "fulfilled";
                fulfilledThenable.value = fulfilledValue;
              }
            },
            function (error) {
              if ("pending" === thenable.status) {
                var rejectedThenable = thenable;
                rejectedThenable.status = "rejected";
                rejectedThenable.reason = error;
              }
            }
          ),
          thenable.status)
        ) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
        }
      suspendedThenable = thenable;
      throw SuspenseException;
  }
}
var suspendedThenable = null;
function getSuspendedThenable() {
  if (null === suspendedThenable)
    throw Error(
      "Expected a suspended thenable. This is a bug in React. Please file an issue."
    );
  var thenable = suspendedThenable;
  suspendedThenable = null;
  return thenable;
}
function is(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var objectIs = "function" === typeof Object.is ? Object.is : is,
  currentlyRenderingComponent = null,
  currentlyRenderingTask = null,
  firstWorkInProgressHook = null,
  workInProgressHook = null,
  isReRender = !1,
  didScheduleRenderPhaseUpdate = !1,
  localIdCounter = 0,
  thenableIndexCounter = 0,
  thenableState = null,
  renderPhaseUpdates = null,
  numberOfReRenders = 0;
function resolveCurrentlyRenderingComponent() {
  if (null === currentlyRenderingComponent)
    throw Error(
      "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem."
    );
  return currentlyRenderingComponent;
}
function createHook() {
  if (0 < numberOfReRenders)
    throw Error("Rendered more hooks than during the previous render");
  return { memoizedState: null, queue: null, next: null };
}
function createWorkInProgressHook() {
  null === workInProgressHook
    ? null === firstWorkInProgressHook
      ? ((isReRender = !1),
        (firstWorkInProgressHook = workInProgressHook = createHook()))
      : ((isReRender = !0), (workInProgressHook = firstWorkInProgressHook))
    : null === workInProgressHook.next
    ? ((isReRender = !1),
      (workInProgressHook = workInProgressHook.next = createHook()))
    : ((isReRender = !0), (workInProgressHook = workInProgressHook.next));
  return workInProgressHook;
}
function finishHooks(Component, props, children, refOrContext) {
  for (; didScheduleRenderPhaseUpdate; )
    (didScheduleRenderPhaseUpdate = !1),
      (thenableIndexCounter = localIdCounter = 0),
      (numberOfReRenders += 1),
      (workInProgressHook = null),
      (children = Component(props, refOrContext));
  resetHooksState();
  return children;
}
function getThenableStateAfterSuspending() {
  var state = thenableState;
  thenableState = null;
  return state;
}
function resetHooksState() {
  currentlyRenderingTask = currentlyRenderingComponent = null;
  didScheduleRenderPhaseUpdate = !1;
  firstWorkInProgressHook = null;
  numberOfReRenders = 0;
  workInProgressHook = renderPhaseUpdates = null;
}
function basicStateReducer(state, action) {
  return "function" === typeof action ? action(state) : action;
}
function useReducer(reducer, initialArg, init) {
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();
  if (isReRender) {
    var queue = workInProgressHook.queue;
    initialArg = queue.dispatch;
    if (
      null !== renderPhaseUpdates &&
      ((init = renderPhaseUpdates.get(queue)), void 0 !== init)
    ) {
      renderPhaseUpdates.delete(queue);
      queue = workInProgressHook.memoizedState;
      do (queue = reducer(queue, init.action)), (init = init.next);
      while (null !== init);
      workInProgressHook.memoizedState = queue;
      return [queue, initialArg];
    }
    return [workInProgressHook.memoizedState, initialArg];
  }
  reducer =
    reducer === basicStateReducer
      ? "function" === typeof initialArg
        ? initialArg()
        : initialArg
      : void 0 !== init
      ? init(initialArg)
      : initialArg;
  workInProgressHook.memoizedState = reducer;
  reducer = workInProgressHook.queue = { last: null, dispatch: null };
  reducer = reducer.dispatch = dispatchAction.bind(
    null,
    currentlyRenderingComponent,
    reducer
  );
  return [workInProgressHook.memoizedState, reducer];
}
function useMemo(nextCreate, deps) {
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  if (null !== workInProgressHook) {
    var prevState = workInProgressHook.memoizedState;
    if (null !== prevState && null !== deps) {
      var prevDeps = prevState[1];
      a: if (null === prevDeps) prevDeps = !1;
      else {
        for (var i = 0; i < prevDeps.length && i < deps.length; i++)
          if (!objectIs(deps[i], prevDeps[i])) {
            prevDeps = !1;
            break a;
          }
        prevDeps = !0;
      }
      if (prevDeps) return prevState[0];
    }
  }
  nextCreate = nextCreate();
  workInProgressHook.memoizedState = [nextCreate, deps];
  return nextCreate;
}
function dispatchAction(componentIdentity, queue, action) {
  if (25 <= numberOfReRenders)
    throw Error(
      "Too many re-renders. React limits the number of renders to prevent an infinite loop."
    );
  if (componentIdentity === currentlyRenderingComponent)
    if (
      ((didScheduleRenderPhaseUpdate = !0),
      (componentIdentity = { action: action, next: null }),
      null === renderPhaseUpdates && (renderPhaseUpdates = new Map()),
      (action = renderPhaseUpdates.get(queue)),
      void 0 === action)
    )
      renderPhaseUpdates.set(queue, componentIdentity);
    else {
      for (queue = action; null !== queue.next; ) queue = queue.next;
      queue.next = componentIdentity;
    }
}
function throwOnUseEffectEventCall() {
  throw Error(
    "A function wrapped in useEffectEvent can't be called during rendering."
  );
}
function unsupportedStartTransition() {
  throw Error("startTransition cannot be called during server rendering.");
}
function unsupportedSetOptimisticState() {
  throw Error("Cannot update optimistic state while rendering.");
}
function useOptimistic(passthrough) {
  resolveCurrentlyRenderingComponent();
  return [passthrough, unsupportedSetOptimisticState];
}
function unwrapThenable(thenable) {
  var index = thenableIndexCounter;
  thenableIndexCounter += 1;
  null === thenableState && (thenableState = []);
  return trackUsedThenable(thenableState, thenable, index);
}
function unsupportedRefresh() {
  throw Error("Cache cannot be refreshed during server rendering.");
}
function noop$1() {}
var HooksDispatcher = {
  readContext: function (context) {
    return context._currentValue;
  },
  use: function (usable) {
    if (null !== usable && "object" === typeof usable) {
      if ("function" === typeof usable.then) return unwrapThenable(usable);
      if (
        usable.$$typeof === REACT_CONTEXT_TYPE ||
        usable.$$typeof === REACT_SERVER_CONTEXT_TYPE
      )
        return usable._currentValue;
    }
    throw Error("An unsupported type was passed to use(): " + String(usable));
  },
  useContext: function (context) {
    resolveCurrentlyRenderingComponent();
    return context._currentValue;
  },
  useMemo: useMemo,
  useReducer: useReducer,
  useRef: function (initialValue) {
    currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
    workInProgressHook = createWorkInProgressHook();
    var previousRef = workInProgressHook.memoizedState;
    return null === previousRef
      ? ((initialValue = { current: initialValue }),
        (workInProgressHook.memoizedState = initialValue))
      : previousRef;
  },
  useState: function (initialState) {
    return useReducer(basicStateReducer, initialState);
  },
  useInsertionEffect: noop$1,
  useLayoutEffect: noop$1,
  useCallback: function (callback, deps) {
    return useMemo(function () {
      return callback;
    }, deps);
  },
  useImperativeHandle: noop$1,
  useEffect: noop$1,
  useDebugValue: noop$1,
  useDeferredValue: function (value) {
    resolveCurrentlyRenderingComponent();
    return value;
  },
  useTransition: function () {
    resolveCurrentlyRenderingComponent();
    return [!1, unsupportedStartTransition];
  },
  useId: function () {
    var JSCompiler_inline_result = currentlyRenderingTask.treeContext;
    var overflow = JSCompiler_inline_result.overflow;
    JSCompiler_inline_result = JSCompiler_inline_result.id;
    JSCompiler_inline_result =
      (
        JSCompiler_inline_result &
        ~(1 << (32 - clz32(JSCompiler_inline_result) - 1))
      ).toString(32) + overflow;
    var responseState = currentResponseState;
    if (null === responseState)
      throw Error(
        "Invalid hook call. Hooks can only be called inside of the body of a function component."
      );
    overflow = localIdCounter++;
    JSCompiler_inline_result =
      ":" + responseState.idPrefix + "R" + JSCompiler_inline_result;
    0 < overflow && (JSCompiler_inline_result += "H" + overflow.toString(32));
    return JSCompiler_inline_result + ":";
  },
  useMutableSource: function (source, getSnapshot) {
    resolveCurrentlyRenderingComponent();
    return getSnapshot(source._source);
  },
  useSyncExternalStore: function (subscribe, getSnapshot, getServerSnapshot) {
    if (void 0 === getServerSnapshot)
      throw Error(
        "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
      );
    return getServerSnapshot();
  },
  useCacheRefresh: function () {
    return unsupportedRefresh;
  },
  useEffectEvent: function () {
    return throwOnUseEffectEventCall;
  },
  useMemoCache: function (size) {
    for (var data = Array(size), i = 0; i < size; i++)
      data[i] = REACT_MEMO_CACHE_SENTINEL;
    return data;
  }
};
enableAsyncActions && (HooksDispatcher.useOptimistic = useOptimistic);
var currentResponseState = null,
  DefaultCacheDispatcher = {
    getCacheSignal: function () {
      throw Error("Not implemented.");
    },
    getCacheForType: function () {
      throw Error("Not implemented.");
    }
  },
  ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentCache = ReactSharedInternals.ReactCurrentCache;
function defaultErrorHandler(error) {
  console.error(error);
  return null;
}
function noop() {}
var currentRequest = null;
function createTask(
  request,
  thenableState,
  node,
  blockedBoundary,
  blockedSegment,
  abortSet,
  legacyContext,
  context,
  treeContext
) {
  request.allPendingTasks++;
  null === blockedBoundary
    ? request.pendingRootTasks++
    : blockedBoundary.pendingTasks++;
  var task = {
    node: node,
    ping: function () {
      request.pingedTasks.push(task);
      1 === request.pingedTasks.length &&
        (request.flushScheduled = null !== request.destination);
    },
    blockedBoundary: blockedBoundary,
    blockedSegment: blockedSegment,
    abortSet: abortSet,
    legacyContext: legacyContext,
    context: context,
    treeContext: treeContext,
    thenableState: thenableState
  };
  abortSet.add(task);
  return task;
}
function createPendingSegment(
  request,
  index,
  boundary,
  formatContext,
  lastPushedText,
  textEmbedded
) {
  return {
    status: 0,
    id: -1,
    index: index,
    parentFlushed: !1,
    chunks: [],
    children: [],
    formatContext: formatContext,
    boundary: boundary,
    lastPushedText: lastPushedText,
    textEmbedded: textEmbedded
  };
}
function logRecoverableError(request, error) {
  request = request.onError(error);
  if (null != request && "string" !== typeof request)
    throw Error(
      'onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' +
        typeof request +
        '" instead'
    );
  return request;
}
function fatalError(request, error) {
  var onShellError = request.onShellError;
  onShellError(error);
  onShellError = request.onFatalError;
  onShellError(error);
  null !== request.destination
    ? ((request.status = 2),
      (request = request.destination),
      (request.done = !0),
      (request.fatal = !0),
      (request.error = error))
    : ((request.status = 1), (request.fatalError = error));
}
function resolveDefaultProps(Component, baseProps) {
  if (Component && Component.defaultProps) {
    baseProps = assign({}, baseProps);
    Component = Component.defaultProps;
    for (var propName in Component)
      void 0 === baseProps[propName] &&
        (baseProps[propName] = Component[propName]);
    return baseProps;
  }
  return baseProps;
}
function renderElement(request, task, prevThenableState, type, props, ref) {
  if ("function" === typeof type)
    if (type.prototype && type.prototype.isReactComponent) {
      prevThenableState = emptyContextObject;
      ref = type.contextType;
      "object" === typeof ref &&
        null !== ref &&
        (prevThenableState = ref._currentValue);
      prevThenableState = new type(props, prevThenableState);
      var initialState =
        void 0 !== prevThenableState.state ? prevThenableState.state : null;
      prevThenableState.updater = classComponentUpdater;
      prevThenableState.props = props;
      prevThenableState.state = initialState;
      ref = { queue: [], replace: !1 };
      prevThenableState._reactInternals = ref;
      var contextType = type.contextType;
      prevThenableState.context =
        "object" === typeof contextType && null !== contextType
          ? contextType._currentValue
          : emptyContextObject;
      contextType = type.getDerivedStateFromProps;
      "function" === typeof contextType &&
        ((contextType = contextType(props, initialState)),
        (initialState =
          null === contextType || void 0 === contextType
            ? initialState
            : assign({}, initialState, contextType)),
        (prevThenableState.state = initialState));
      if (
        "function" !== typeof type.getDerivedStateFromProps &&
        "function" !== typeof prevThenableState.getSnapshotBeforeUpdate &&
        ("function" === typeof prevThenableState.UNSAFE_componentWillMount ||
          "function" === typeof prevThenableState.componentWillMount)
      )
        if (
          ((type = prevThenableState.state),
          "function" === typeof prevThenableState.componentWillMount &&
            prevThenableState.componentWillMount(),
          "function" === typeof prevThenableState.UNSAFE_componentWillMount &&
            prevThenableState.UNSAFE_componentWillMount(),
          type !== prevThenableState.state &&
            classComponentUpdater.enqueueReplaceState(
              prevThenableState,
              prevThenableState.state,
              null
            ),
          null !== ref.queue && 0 < ref.queue.length)
        )
          if (
            ((type = ref.queue),
            (contextType = ref.replace),
            (ref.queue = null),
            (ref.replace = !1),
            contextType && 1 === type.length)
          )
            prevThenableState.state = type[0];
          else {
            ref = contextType ? type[0] : prevThenableState.state;
            initialState = !0;
            for (
              contextType = contextType ? 1 : 0;
              contextType < type.length;
              contextType++
            ) {
              var partial = type[contextType];
              partial =
                "function" === typeof partial
                  ? partial.call(prevThenableState, ref, props, void 0)
                  : partial;
              null != partial &&
                (initialState
                  ? ((initialState = !1), (ref = assign({}, ref, partial)))
                  : assign(ref, partial));
            }
            prevThenableState.state = ref;
          }
        else ref.queue = null;
      props = prevThenableState.render();
      renderNodeDestructiveImpl(request, task, null, props);
    } else if (
      ((currentlyRenderingComponent = {}),
      (currentlyRenderingTask = task),
      (thenableIndexCounter = localIdCounter = 0),
      (thenableState = prevThenableState),
      (prevThenableState = type(props, void 0)),
      (props = finishHooks(type, props, prevThenableState, void 0)),
      0 !== localIdCounter)
    ) {
      type = task.treeContext;
      task.treeContext = pushTreeContext(type, 1, 0);
      try {
        renderNodeDestructiveImpl(request, task, null, props);
      } finally {
        task.treeContext = type;
      }
    } else renderNodeDestructiveImpl(request, task, null, props);
  else if ("string" === typeof type) {
    prevThenableState = task.blockedSegment;
    initialState = pushStartInstance(
      prevThenableState.chunks,
      type,
      props,
      request.resources,
      request.responseState,
      prevThenableState.formatContext,
      prevThenableState.lastPushedText
    );
    prevThenableState.lastPushedText = !1;
    ref = prevThenableState.formatContext;
    prevThenableState.formatContext = getChildFormatContext(ref, type, props);
    renderNode(request, task, initialState);
    prevThenableState.formatContext = ref;
    a: {
      task = prevThenableState.chunks;
      switch (type) {
        case "title":
        case "style":
        case "script":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "input":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          break a;
        case "body":
          if (1 >= ref.insertionMode) {
            request.responseState.hasBody = !0;
            break a;
          }
          break;
        case "html":
          if (0 === ref.insertionMode) break a;
      }
      task.push("</", type, ">");
    }
    prevThenableState.lastPushedText = !1;
  } else {
    switch (type) {
      case REACT_LEGACY_HIDDEN_TYPE:
      case REACT_DEBUG_TRACING_MODE_TYPE:
      case REACT_STRICT_MODE_TYPE:
      case REACT_PROFILER_TYPE:
      case REACT_FRAGMENT_TYPE:
        renderNodeDestructiveImpl(request, task, null, props.children);
        return;
      case REACT_OFFSCREEN_TYPE:
        "hidden" !== props.mode &&
          renderNodeDestructiveImpl(request, task, null, props.children);
        return;
      case REACT_SUSPENSE_LIST_TYPE:
        renderNodeDestructiveImpl(request, task, null, props.children);
        return;
      case REACT_SCOPE_TYPE:
        renderNodeDestructiveImpl(request, task, null, props.children);
        return;
      case REACT_SUSPENSE_TYPE:
        a: {
          type = task.blockedBoundary;
          prevThenableState = task.blockedSegment;
          ref = props.fallback;
          props = props.children;
          initialState = new Set();
          contextType = {
            id: null,
            rootSegmentID: -1,
            parentFlushed: !1,
            pendingTasks: 0,
            forceClientRender: !1,
            completedSegments: [],
            byteSize: 0,
            fallbackAbortableTasks: initialState,
            errorDigest: null,
            resources: new Set()
          };
          partial = createPendingSegment(
            request,
            prevThenableState.chunks.length,
            contextType,
            prevThenableState.formatContext,
            !1,
            !1
          );
          prevThenableState.children.push(partial);
          prevThenableState.lastPushedText = !1;
          var contentRootSegment = createPendingSegment(
            request,
            0,
            null,
            prevThenableState.formatContext,
            !1,
            !1
          );
          contentRootSegment.parentFlushed = !0;
          task.blockedBoundary = contextType;
          task.blockedSegment = contentRootSegment;
          request.resources.boundaryResources = contextType.resources;
          try {
            if (
              (renderNode(request, task, props),
              contentRootSegment.lastPushedText &&
                contentRootSegment.textEmbedded &&
                contentRootSegment.chunks.push("\x3c!-- --\x3e"),
              (contentRootSegment.status = 1),
              queueCompletedSegment(contextType, contentRootSegment),
              0 === contextType.pendingTasks)
            )
              break a;
          } catch (error) {
            (contentRootSegment.status = 4),
              (contextType.forceClientRender = !0),
              (contextType.errorDigest = logRecoverableError(request, error));
          } finally {
            (request.resources.boundaryResources = type
              ? type.resources
              : null),
              (task.blockedBoundary = type),
              (task.blockedSegment = prevThenableState);
          }
          task = createTask(
            request,
            null,
            ref,
            type,
            partial,
            initialState,
            task.legacyContext,
            task.context,
            task.treeContext
          );
          request.pingedTasks.push(task);
        }
        return;
    }
    if ("object" === typeof type && null !== type)
      switch (type.$$typeof) {
        case REACT_FORWARD_REF_TYPE:
          type = type.render;
          currentlyRenderingComponent = {};
          currentlyRenderingTask = task;
          thenableIndexCounter = localIdCounter = 0;
          thenableState = prevThenableState;
          prevThenableState = type(props, ref);
          props = finishHooks(type, props, prevThenableState, ref);
          if (0 !== localIdCounter) {
            type = task.treeContext;
            task.treeContext = pushTreeContext(type, 1, 0);
            try {
              renderNodeDestructiveImpl(request, task, null, props);
            } finally {
              task.treeContext = type;
            }
          } else renderNodeDestructiveImpl(request, task, null, props);
          return;
        case REACT_MEMO_TYPE:
          type = type.type;
          props = resolveDefaultProps(type, props);
          renderElement(request, task, prevThenableState, type, props, ref);
          return;
        case REACT_PROVIDER_TYPE:
          prevThenableState = props.children;
          type = type._context;
          props = props.value;
          ref = type._currentValue;
          type._currentValue = props;
          initialState = currentActiveSnapshot;
          currentActiveSnapshot = props = {
            parent: initialState,
            depth: null === initialState ? 0 : initialState.depth + 1,
            context: type,
            parentValue: ref,
            value: props
          };
          task.context = props;
          renderNodeDestructiveImpl(request, task, null, prevThenableState);
          request = currentActiveSnapshot;
          if (null === request)
            throw Error(
              "Tried to pop a Context at the root of the app. This is a bug in React."
            );
          props = request.parentValue;
          request.context._currentValue =
            props === REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED
              ? request.context._defaultValue
              : props;
          request = currentActiveSnapshot = request.parent;
          task.context = request;
          return;
        case REACT_CONTEXT_TYPE:
          props = props.children;
          props = props(type._currentValue);
          renderNodeDestructiveImpl(request, task, null, props);
          return;
        case REACT_LAZY_TYPE:
          ref = type._init;
          type = ref(type._payload);
          props = resolveDefaultProps(type, props);
          renderElement(request, task, prevThenableState, type, props, void 0);
          return;
      }
    throw Error(
      "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " +
        ((null == type ? type : typeof type) + ".")
    );
  }
}
function renderNodeDestructiveImpl(request, task, prevThenableState, node) {
  task.node = node;
  if ("object" === typeof node && null !== node) {
    switch (node.$$typeof) {
      case REACT_ELEMENT_TYPE:
        renderElement(
          request,
          task,
          prevThenableState,
          node.type,
          node.props,
          node.ref
        );
        return;
      case REACT_PORTAL_TYPE:
        throw Error(
          "Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render."
        );
      case REACT_LAZY_TYPE:
        prevThenableState = node._init;
        node = prevThenableState(node._payload);
        renderNodeDestructiveImpl(request, task, null, node);
        return;
    }
    if (isArrayImpl(node)) {
      renderChildrenArray(request, task, node);
      return;
    }
    null === node || "object" !== typeof node
      ? (prevThenableState = null)
      : ((prevThenableState =
          (MAYBE_ITERATOR_SYMBOL && node[MAYBE_ITERATOR_SYMBOL]) ||
          node["@@iterator"]),
        (prevThenableState =
          "function" === typeof prevThenableState ? prevThenableState : null));
    if (
      prevThenableState &&
      (prevThenableState = prevThenableState.call(node))
    ) {
      node = prevThenableState.next();
      if (!node.done) {
        var children = [];
        do children.push(node.value), (node = prevThenableState.next());
        while (!node.done);
        renderChildrenArray(request, task, children);
      }
      return;
    }
    if ("function" === typeof node.then)
      return renderNodeDestructiveImpl(
        request,
        task,
        null,
        unwrapThenable(node)
      );
    if (
      node.$$typeof === REACT_CONTEXT_TYPE ||
      node.$$typeof === REACT_SERVER_CONTEXT_TYPE
    )
      return renderNodeDestructiveImpl(request, task, null, node._currentValue);
    request = Object.prototype.toString.call(node);
    throw Error(
      "Objects are not valid as a React child (found: " +
        ("[object Object]" === request
          ? "object with keys {" + Object.keys(node).join(", ") + "}"
          : request) +
        "). If you meant to render a collection of children, use an array instead."
    );
  }
  "string" === typeof node
    ? ((prevThenableState = task.blockedSegment),
      (prevThenableState.lastPushedText = pushTextInstance(
        task.blockedSegment.chunks,
        node,
        request.responseState,
        prevThenableState.lastPushedText
      )))
    : "number" === typeof node &&
      ((prevThenableState = task.blockedSegment),
      (prevThenableState.lastPushedText = pushTextInstance(
        task.blockedSegment.chunks,
        "" + node,
        request.responseState,
        prevThenableState.lastPushedText
      )));
}
function renderChildrenArray(request, task, children) {
  for (var totalChildren = children.length, i = 0; i < totalChildren; i++) {
    var prevTreeContext = task.treeContext;
    task.treeContext = pushTreeContext(prevTreeContext, totalChildren, i);
    try {
      renderNode(request, task, children[i]);
    } finally {
      task.treeContext = prevTreeContext;
    }
  }
}
function renderNode(request, task, node) {
  var previousFormatContext = task.blockedSegment.formatContext,
    previousLegacyContext = task.legacyContext,
    previousContext = task.context;
  try {
    return renderNodeDestructiveImpl(request, task, null, node);
  } catch (thrownValue) {
    if (
      (resetHooksState(),
      (node =
        thrownValue === SuspenseException
          ? getSuspendedThenable()
          : thrownValue),
      "object" === typeof node &&
        null !== node &&
        "function" === typeof node.then)
    ) {
      var thenableState$15 = getThenableStateAfterSuspending(),
        segment = task.blockedSegment,
        newSegment = createPendingSegment(
          request,
          segment.chunks.length,
          null,
          segment.formatContext,
          segment.lastPushedText,
          !0
        );
      segment.children.push(newSegment);
      segment.lastPushedText = !1;
      request = createTask(
        request,
        thenableState$15,
        task.node,
        task.blockedBoundary,
        newSegment,
        task.abortSet,
        task.legacyContext,
        task.context,
        task.treeContext
      ).ping;
      node.then(request, request);
      task.blockedSegment.formatContext = previousFormatContext;
      task.legacyContext = previousLegacyContext;
      task.context = previousContext;
      switchContext(previousContext);
    } else
      throw (
        ((task.blockedSegment.formatContext = previousFormatContext),
        (task.legacyContext = previousLegacyContext),
        (task.context = previousContext),
        switchContext(previousContext),
        node)
      );
  }
}
function abortTaskSoft(task) {
  var boundary = task.blockedBoundary;
  task = task.blockedSegment;
  task.status = 3;
  finishedTask(this, boundary, task);
}
function abortTask(task, request, error) {
  var boundary = task.blockedBoundary;
  task.blockedSegment.status = 3;
  null === boundary
    ? (request.allPendingTasks--,
      1 !== request.status &&
        2 !== request.status &&
        (logRecoverableError(request, error), fatalError(request, error)))
    : (boundary.pendingTasks--,
      boundary.forceClientRender ||
        ((boundary.forceClientRender = !0),
        (boundary.errorDigest = request.onError(error)),
        boundary.parentFlushed &&
          request.clientRenderedBoundaries.push(boundary)),
      boundary.fallbackAbortableTasks.forEach(function (fallbackTask) {
        return abortTask(fallbackTask, request, error);
      }),
      boundary.fallbackAbortableTasks.clear(),
      request.allPendingTasks--,
      0 === request.allPendingTasks && ((task = request.onAllReady), task()));
}
function queueCompletedSegment(boundary, segment) {
  if (
    0 === segment.chunks.length &&
    1 === segment.children.length &&
    null === segment.children[0].boundary
  ) {
    var childSegment = segment.children[0];
    childSegment.id = segment.id;
    childSegment.parentFlushed = !0;
    1 === childSegment.status && queueCompletedSegment(boundary, childSegment);
  } else boundary.completedSegments.push(segment);
}
function finishedTask(request, boundary, segment) {
  if (null === boundary) {
    if (segment.parentFlushed) {
      if (null !== request.completedRootSegment)
        throw Error(
          "There can only be one root segment. This is a bug in React."
        );
      request.completedRootSegment = segment;
    }
    request.pendingRootTasks--;
    0 === request.pendingRootTasks &&
      ((request.onShellError = noop),
      (boundary = request.onShellReady),
      boundary());
  } else
    boundary.pendingTasks--,
      boundary.forceClientRender ||
        (0 === boundary.pendingTasks
          ? (segment.parentFlushed &&
              1 === segment.status &&
              queueCompletedSegment(boundary, segment),
            boundary.parentFlushed &&
              request.completedBoundaries.push(boundary),
            boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request),
            boundary.fallbackAbortableTasks.clear())
          : segment.parentFlushed &&
            1 === segment.status &&
            (queueCompletedSegment(boundary, segment),
            1 === boundary.completedSegments.length &&
              boundary.parentFlushed &&
              request.partialBoundaries.push(boundary)));
  request.allPendingTasks--;
  0 === request.allPendingTasks && ((request = request.onAllReady), request());
}
function flushSubtree(request, destination, segment) {
  segment.parentFlushed = !0;
  switch (segment.status) {
    case 0:
      var segmentID = (segment.id = request.nextSegmentId++);
      segment.lastPushedText = !1;
      segment.textEmbedded = !1;
      request = request.responseState;
      writeChunk(destination, '<template id="');
      writeChunk(destination, request.placeholderPrefix);
      request = segmentID.toString(16);
      writeChunk(destination, request);
      return writeChunkAndReturn(destination, '"></template>');
    case 1:
      segment.status = 2;
      var r = !0;
      segmentID = segment.chunks;
      var chunkIdx = 0;
      segment = segment.children;
      for (var childIdx = 0; childIdx < segment.length; childIdx++) {
        for (r = segment[childIdx]; chunkIdx < r.index; chunkIdx++)
          destination.buffer += segmentID[chunkIdx];
        r = flushSegment(request, destination, r);
      }
      for (; chunkIdx < segmentID.length - 1; chunkIdx++)
        destination.buffer += segmentID[chunkIdx];
      chunkIdx < segmentID.length &&
        (r = writeChunkAndReturn(destination, segmentID[chunkIdx]));
      return r;
    default:
      throw Error(
        "Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React."
      );
  }
}
function flushSegment(request, destination, segment) {
  var boundary = segment.boundary;
  if (null === boundary) return flushSubtree(request, destination, segment);
  boundary.parentFlushed = !0;
  if (boundary.forceClientRender)
    (boundary = boundary.errorDigest),
      writeChunkAndReturn(destination, "\x3c!--$!--\x3e"),
      writeChunk(destination, "<template"),
      boundary &&
        (writeChunk(destination, ' data-dgst="'),
        writeChunk(destination, escapeTextForBrowser(boundary)),
        writeChunk(destination, '"')),
      writeChunkAndReturn(destination, "></template>"),
      flushSubtree(request, destination, segment);
  else if (0 < boundary.pendingTasks) {
    boundary.rootSegmentID = request.nextSegmentId++;
    0 < boundary.completedSegments.length &&
      request.partialBoundaries.push(boundary);
    var JSCompiler_inline_result = request.responseState;
    var generatedID = JSCompiler_inline_result.nextSuspenseID++;
    JSCompiler_inline_result =
      JSCompiler_inline_result.boundaryPrefix + generatedID.toString(16);
    boundary = boundary.id = JSCompiler_inline_result;
    writeStartPendingSuspenseBoundary(
      destination,
      request.responseState,
      boundary
    );
    flushSubtree(request, destination, segment);
  } else if (boundary.byteSize > request.progressiveChunkSize)
    (boundary.rootSegmentID = request.nextSegmentId++),
      request.completedBoundaries.push(boundary),
      writeStartPendingSuspenseBoundary(
        destination,
        request.responseState,
        boundary.id
      ),
      flushSubtree(request, destination, segment);
  else {
    (segment = request.resources.boundaryResources) &&
      boundary.resources.forEach(hoistStyleResource, segment);
    writeChunkAndReturn(destination, "\x3c!--$--\x3e");
    segment = boundary.completedSegments;
    if (1 !== segment.length)
      throw Error(
        "A previously unvisited boundary must have exactly one root segment. This is a bug in React."
      );
    flushSegment(request, destination, segment[0]);
  }
  return writeChunkAndReturn(destination, "\x3c!--/$--\x3e");
}
function flushSegmentContainer(request, destination, segment) {
  writeStartSegment(
    destination,
    request.responseState,
    segment.formatContext,
    segment.id
  );
  flushSegment(request, destination, segment);
  return writeEndSegment(destination, segment.formatContext);
}
function flushCompletedBoundary(request, destination, boundary) {
  request.resources.boundaryResources = boundary.resources;
  for (
    var completedSegments = boundary.completedSegments, i = 0;
    i < completedSegments.length;
    i++
  )
    flushPartiallyCompletedSegment(
      request,
      destination,
      boundary,
      completedSegments[i]
    );
  completedSegments.length = 0;
  writeResourcesForBoundary(
    destination,
    boundary.resources,
    request.responseState
  );
  request = request.responseState;
  completedSegments = boundary.id;
  i = boundary.rootSegmentID;
  boundary = boundary.resources;
  var requiresStyleInsertion = request.stylesToHoist;
  request.stylesToHoist = !1;
  var scriptFormat = 0 === request.streamingFormat;
  scriptFormat
    ? (writeChunk(destination, request.startInlineScript),
      requiresStyleInsertion
        ? 0 === (request.instructions & 2)
          ? ((request.instructions |= 10),
            writeChunk(
              destination,
              '$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RM=new Map;\n$RR=function(r,t,w){for(var u=$RC,n=$RM,p=new Map,q=document,g,b,h=q.querySelectorAll("link[data-precedence],style[data-precedence]"),v=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?v.push(b):("LINK"===b.tagName&&n.set(b.getAttribute("href"),b),p.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var f=w[b++];if(!f){k=!1;b=0;continue}var c=!1,m=0;var d=f[m++];if(a=n.get(d)){var e=a._p;c=!0}else{a=q.createElement("link");a.href=d;a.rel="stylesheet";for(a.dataset.precedence=\nl=f[m++];e=f[m++];)a.setAttribute(e,f[m++]);e=a._p=new Promise(function(x,y){a.onload=x;a.onerror=y});n.set(d,a)}d=a.getAttribute("media");!e||"l"===e.s||d&&!matchMedia(d).matches||h.push(e);if(c)continue}else{a=v[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=p.get(l)||g;c===g&&(g=a);p.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=q.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(u.bind(null,r,t,""),u.bind(null,r,t,"Resource failed to load"))};$RR("'
            ))
          : 0 === (request.instructions & 8)
          ? ((request.instructions |= 8),
            writeChunk(
              destination,
              '$RM=new Map;\n$RR=function(r,t,w){for(var u=$RC,n=$RM,p=new Map,q=document,g,b,h=q.querySelectorAll("link[data-precedence],style[data-precedence]"),v=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?v.push(b):("LINK"===b.tagName&&n.set(b.getAttribute("href"),b),p.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var f=w[b++];if(!f){k=!1;b=0;continue}var c=!1,m=0;var d=f[m++];if(a=n.get(d)){var e=a._p;c=!0}else{a=q.createElement("link");a.href=d;a.rel="stylesheet";for(a.dataset.precedence=\nl=f[m++];e=f[m++];)a.setAttribute(e,f[m++]);e=a._p=new Promise(function(x,y){a.onload=x;a.onerror=y});n.set(d,a)}d=a.getAttribute("media");!e||"l"===e.s||d&&!matchMedia(d).matches||h.push(e);if(c)continue}else{a=v[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=p.get(l)||g;c===g&&(g=a);p.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=q.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(u.bind(null,r,t,""),u.bind(null,r,t,"Resource failed to load"))};$RR("'
            ))
          : writeChunk(destination, '$RR("')
        : 0 === (request.instructions & 2)
        ? ((request.instructions |= 2),
          writeChunk(
            destination,
            '$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RC("'
          ))
        : writeChunk(destination, '$RC("'))
    : requiresStyleInsertion
    ? writeChunk(destination, '<template data-rri="" data-bid="')
    : writeChunk(destination, '<template data-rci="" data-bid="');
  if (null === completedSegments)
    throw Error(
      "An ID must have been assigned before we can complete the boundary."
    );
  i = i.toString(16);
  writeChunk(destination, completedSegments);
  scriptFormat
    ? writeChunk(destination, '","')
    : writeChunk(destination, '" data-sid="');
  writeChunk(destination, request.segmentPrefix);
  writeChunk(destination, i);
  requiresStyleInsertion
    ? scriptFormat
      ? (writeChunk(destination, '",'),
        writeStyleResourceDependenciesInJS(destination, boundary))
      : (writeChunk(destination, '" data-sty="'),
        writeStyleResourceDependenciesInAttr(destination, boundary))
    : scriptFormat && writeChunk(destination, '"');
  completedSegments = scriptFormat
    ? writeChunkAndReturn(destination, ")\x3c/script>")
    : writeChunkAndReturn(destination, '"></template>');
  return writeBootstrap(destination, request) && completedSegments;
}
function flushPartiallyCompletedSegment(
  request,
  destination,
  boundary,
  segment
) {
  if (2 === segment.status) return !0;
  var segmentID = segment.id;
  if (-1 === segmentID) {
    if (-1 === (segment.id = boundary.rootSegmentID))
      throw Error(
        "A root segment ID must have been assigned by now. This is a bug in React."
      );
    return flushSegmentContainer(request, destination, segment);
  }
  flushSegmentContainer(request, destination, segment);
  request = request.responseState;
  (boundary = 0 === request.streamingFormat)
    ? (writeChunk(destination, request.startInlineScript),
      0 === (request.instructions & 1)
        ? ((request.instructions |= 1),
          writeChunk(
            destination,
            '$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};;$RS("'
          ))
        : writeChunk(destination, '$RS("'))
    : writeChunk(destination, '<template data-rsi="" data-sid="');
  writeChunk(destination, request.segmentPrefix);
  segmentID = segmentID.toString(16);
  writeChunk(destination, segmentID);
  boundary
    ? writeChunk(destination, '","')
    : writeChunk(destination, '" data-pid="');
  writeChunk(destination, request.placeholderPrefix);
  writeChunk(destination, segmentID);
  destination = boundary
    ? writeChunkAndReturn(destination, '")\x3c/script>')
    : writeChunkAndReturn(destination, '"></template>');
  return destination;
}
function flushCompletedQueues(request, destination) {
  try {
    var i,
      completedRootSegment = request.completedRootSegment;
    if (null !== completedRootSegment)
      if (0 === request.pendingRootTasks)
        writePreamble(
          destination,
          request.resources,
          request.responseState,
          0 === request.allPendingTasks
        ),
          flushSegment(request, destination, completedRootSegment),
          (request.completedRootSegment = null),
          writeBootstrap(destination, request.responseState);
      else return;
    else writeHoistables(destination, request.resources, request.responseState);
    var clientRenderedBoundaries = request.clientRenderedBoundaries;
    for (i = 0; i < clientRenderedBoundaries.length; i++) {
      var boundary = clientRenderedBoundaries[i];
      completedRootSegment = destination;
      var responseState = request.responseState,
        boundaryID = boundary.id,
        errorDigest = boundary.errorDigest,
        errorMessage = boundary.errorMessage,
        errorComponentStack = boundary.errorComponentStack,
        scriptFormat = 0 === responseState.streamingFormat;
      scriptFormat
        ? ((completedRootSegment.buffer += responseState.startInlineScript),
          0 === (responseState.instructions & 4)
            ? ((responseState.instructions |= 4),
              (completedRootSegment.buffer +=
                '$RX=function(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};;$RX("'))
            : (completedRootSegment.buffer += '$RX("'))
        : (completedRootSegment.buffer += '<template data-rxi="" data-bid="');
      if (null === boundaryID)
        throw Error(
          "An ID must have been assigned before we can complete the boundary."
        );
      completedRootSegment.buffer += boundaryID;
      scriptFormat && (completedRootSegment.buffer += '"');
      if (errorDigest || errorMessage || errorComponentStack)
        if (scriptFormat) {
          completedRootSegment.buffer += ",";
          var chunk = escapeJSStringsForInstructionScripts(errorDigest || "");
          completedRootSegment.buffer += chunk;
        } else {
          completedRootSegment.buffer += '" data-dgst="';
          var chunk$jscomp$0 = escapeTextForBrowser(errorDigest || "");
          completedRootSegment.buffer += chunk$jscomp$0;
        }
      if (errorMessage || errorComponentStack)
        if (scriptFormat) {
          completedRootSegment.buffer += ",";
          var chunk$jscomp$1 = escapeJSStringsForInstructionScripts(
            errorMessage || ""
          );
          completedRootSegment.buffer += chunk$jscomp$1;
        } else {
          completedRootSegment.buffer += '" data-msg="';
          var chunk$jscomp$2 = escapeTextForBrowser(errorMessage || "");
          completedRootSegment.buffer += chunk$jscomp$2;
        }
      if (errorComponentStack)
        if (scriptFormat) {
          completedRootSegment.buffer += ",";
          var chunk$jscomp$3 =
            escapeJSStringsForInstructionScripts(errorComponentStack);
          completedRootSegment.buffer += chunk$jscomp$3;
        } else {
          completedRootSegment.buffer += '" data-stck="';
          var chunk$jscomp$4 = escapeTextForBrowser(errorComponentStack);
          completedRootSegment.buffer += chunk$jscomp$4;
        }
      if (
        scriptFormat
          ? !writeChunkAndReturn(completedRootSegment, ")\x3c/script>")
          : !writeChunkAndReturn(completedRootSegment, '"></template>')
      ) {
        request.destination = null;
        i++;
        clientRenderedBoundaries.splice(0, i);
        return;
      }
    }
    clientRenderedBoundaries.splice(0, i);
    var completedBoundaries = request.completedBoundaries;
    for (i = 0; i < completedBoundaries.length; i++)
      if (
        !flushCompletedBoundary(request, destination, completedBoundaries[i])
      ) {
        request.destination = null;
        i++;
        completedBoundaries.splice(0, i);
        return;
      }
    completedBoundaries.splice(0, i);
    var partialBoundaries = request.partialBoundaries;
    for (i = 0; i < partialBoundaries.length; i++) {
      var boundary$17 = partialBoundaries[i];
      a: {
        clientRenderedBoundaries = request;
        boundary = destination;
        clientRenderedBoundaries.resources.boundaryResources =
          boundary$17.resources;
        var completedSegments = boundary$17.completedSegments;
        for (
          responseState = 0;
          responseState < completedSegments.length;
          responseState++
        )
          if (
            !flushPartiallyCompletedSegment(
              clientRenderedBoundaries,
              boundary,
              boundary$17,
              completedSegments[responseState]
            )
          ) {
            responseState++;
            completedSegments.splice(0, responseState);
            var JSCompiler_inline_result = !1;
            break a;
          }
        completedSegments.splice(0, responseState);
        JSCompiler_inline_result = writeResourcesForBoundary(
          boundary,
          boundary$17.resources,
          clientRenderedBoundaries.responseState
        );
      }
      if (!JSCompiler_inline_result) {
        request.destination = null;
        i++;
        partialBoundaries.splice(0, i);
        return;
      }
    }
    partialBoundaries.splice(0, i);
    var largeBoundaries = request.completedBoundaries;
    for (i = 0; i < largeBoundaries.length; i++)
      if (!flushCompletedBoundary(request, destination, largeBoundaries[i])) {
        request.destination = null;
        i++;
        largeBoundaries.splice(0, i);
        return;
      }
    largeBoundaries.splice(0, i);
  } finally {
    0 === request.allPendingTasks &&
      0 === request.pingedTasks.length &&
      0 === request.clientRenderedBoundaries.length &&
      0 === request.completedBoundaries.length &&
      ((request.flushScheduled = !1),
      (request = request.responseState),
      request.hasBody &&
        (writeChunk(destination, "</"),
        writeChunk(destination, "body"),
        writeChunk(destination, ">")),
      request.htmlChunks &&
        (writeChunk(destination, "</"),
        writeChunk(destination, "html"),
        writeChunk(destination, ">")),
      (destination.done = !0));
  }
}
function enqueueFlush(request) {
  !1 === request.flushScheduled &&
    0 === request.pingedTasks.length &&
    null !== request.destination &&
    (request.flushScheduled = !0);
}
function abort(request, reason) {
  try {
    var abortableTasks = request.abortableTasks;
    if (0 < abortableTasks.size) {
      var error =
        void 0 === reason
          ? Error("The render was aborted by the server without a reason.")
          : reason;
      abortableTasks.forEach(function (task) {
        return abortTask(task, request, error);
      });
      abortableTasks.clear();
    }
    null !== request.destination &&
      flushCompletedQueues(request, request.destination);
  } catch (error$19) {
    logRecoverableError(request, error$19), fatalError(request, error$19);
  }
}
exports.abortStream = function (stream) {
  abort(stream.request);
};
exports.debug = function (stream) {
  stream = stream.request;
  return {
    pendingRootTasks: stream.pendingRootTasks,
    clientRenderedBoundaries: stream.clientRenderedBoundaries.length,
    completedBoundaries: stream.completedBoundaries.length,
    partialBoundaries: stream.partialBoundaries.length,
    allPendingTasks: stream.allPendingTasks,
    pingedTasks: stream.pingedTasks.length
  };
};
exports.hasFinished = function (stream) {
  return stream.destination.done;
};
exports.renderNextChunk = function (stream) {
  var request = stream.request;
  stream = stream.destination;
  if (2 !== request.status) {
    var prevContext = currentActiveSnapshot,
      prevDispatcher = ReactCurrentDispatcher.current;
    ReactCurrentDispatcher.current = HooksDispatcher;
    var prevCacheDispatcher = ReactCurrentCache.current;
    ReactCurrentCache.current = DefaultCacheDispatcher;
    var prevRequest = currentRequest;
    currentRequest = request;
    var prevResponseState = currentResponseState;
    currentResponseState = request.responseState;
    try {
      var pingedTasks = request.pingedTasks,
        i;
      for (i = 0; i < pingedTasks.length; i++) {
        var task = pingedTasks[i],
          blockedBoundary = task.blockedBoundary;
        request.resources.boundaryResources = blockedBoundary
          ? blockedBoundary.resources
          : null;
        var segment = task.blockedSegment;
        if (0 === segment.status) {
          switchContext(task.context);
          try {
            var prevThenableState = task.thenableState;
            task.thenableState = null;
            renderNodeDestructiveImpl(
              request,
              task,
              prevThenableState,
              task.node
            );
            segment.lastPushedText &&
              segment.textEmbedded &&
              segment.chunks.push("\x3c!-- --\x3e");
            task.abortSet.delete(task);
            segment.status = 1;
            finishedTask(request, task.blockedBoundary, segment);
          } catch (thrownValue) {
            resetHooksState();
            var x =
              thrownValue === SuspenseException
                ? getSuspendedThenable()
                : thrownValue;
            if (
              "object" === typeof x &&
              null !== x &&
              "function" === typeof x.then
            ) {
              var ping = task.ping;
              x.then(ping, ping);
              task.thenableState = getThenableStateAfterSuspending();
            } else {
              task.abortSet.delete(task);
              segment.status = 4;
              var boundary = task.blockedBoundary,
                error$jscomp$0 = x,
                errorDigest = logRecoverableError(request, error$jscomp$0);
              null === boundary
                ? fatalError(request, error$jscomp$0)
                : (boundary.pendingTasks--,
                  boundary.forceClientRender ||
                    ((boundary.forceClientRender = !0),
                    (boundary.errorDigest = errorDigest),
                    boundary.parentFlushed &&
                      request.clientRenderedBoundaries.push(boundary)));
              request.allPendingTasks--;
              if (0 === request.allPendingTasks) {
                var onAllReady = request.onAllReady;
                onAllReady();
              }
            }
          } finally {
            request.resources.boundaryResources = null;
          }
        }
      }
      pingedTasks.splice(0, i);
      null !== request.destination &&
        flushCompletedQueues(request, request.destination);
    } catch (error) {
      logRecoverableError(request, error), fatalError(request, error);
    } finally {
      (currentResponseState = prevResponseState),
        (ReactCurrentDispatcher.current = prevDispatcher),
        (ReactCurrentCache.current = prevCacheDispatcher),
        prevDispatcher === HooksDispatcher && switchContext(prevContext),
        (currentRequest = prevRequest);
    }
  }
  if (1 === request.status)
    (request.status = 2),
      (request = request.fatalError),
      (stream.done = !0),
      (stream.fatal = !0),
      (stream.error = request);
  else if (2 !== request.status && null === request.destination) {
    request.destination = stream;
    try {
      flushCompletedQueues(request, stream);
    } catch (error) {
      logRecoverableError(request, error), fatalError(request, error);
    }
  }
  if (stream.fatal) throw stream.error;
  request = stream.buffer;
  stream.buffer = "";
  return request;
};
exports.renderToStream = function (children, options) {
  var destination = { buffer: "", done: !1, fatal: !1, error: null },
    identifierPrefix = options ? options.identifierPrefix : void 0,
    bootstrapScriptContent = options ? options.bootstrapScriptContent : void 0,
    bootstrapScripts = options ? options.bootstrapScripts : void 0,
    bootstrapModules = options ? options.bootstrapModules : void 0,
    externalRuntimeConfig = options
      ? options.unstable_externalRuntimeSrc
      : void 0;
  identifierPrefix = void 0 === identifierPrefix ? "" : identifierPrefix;
  var JSCompiler_inline_result = [];
  var externalRuntimeScript = null,
    streamingFormat = 0;
  void 0 !== bootstrapScriptContent &&
    JSCompiler_inline_result.push(
      "<script>",
      ("" + bootstrapScriptContent).replace(scriptRegex, scriptReplacer),
      "\x3c/script>"
    );
  void 0 !== externalRuntimeConfig &&
    ((streamingFormat = 1),
    "string" === typeof externalRuntimeConfig
      ? ((externalRuntimeScript = { src: externalRuntimeConfig, chunks: [] }),
        pushScriptImpl(externalRuntimeScript.chunks, {
          src: externalRuntimeConfig,
          async: !0,
          integrity: void 0,
          nonce: void 0
        }))
      : ((externalRuntimeScript = {
          src: externalRuntimeConfig.src,
          chunks: []
        }),
        pushScriptImpl(externalRuntimeScript.chunks, {
          src: externalRuntimeConfig.src,
          async: !0,
          integrity: externalRuntimeConfig.integrity,
          nonce: void 0
        })));
  if (void 0 !== bootstrapScripts)
    for (
      bootstrapScriptContent = 0;
      bootstrapScriptContent < bootstrapScripts.length;
      bootstrapScriptContent++
    ) {
      externalRuntimeConfig = bootstrapScripts[bootstrapScriptContent];
      var integrity =
        "string" === typeof externalRuntimeConfig
          ? void 0
          : externalRuntimeConfig.integrity;
      JSCompiler_inline_result.push(
        '<script src="',
        escapeTextForBrowser(
          "string" === typeof externalRuntimeConfig
            ? externalRuntimeConfig
            : externalRuntimeConfig.src
        )
      );
      integrity &&
        JSCompiler_inline_result.push(
          '" integrity="',
          escapeTextForBrowser(integrity)
        );
      JSCompiler_inline_result.push('" async="">\x3c/script>');
    }
  if (void 0 !== bootstrapModules)
    for (
      bootstrapScripts = 0;
      bootstrapScripts < bootstrapModules.length;
      bootstrapScripts++
    )
      (bootstrapScriptContent = bootstrapModules[bootstrapScripts]),
        (externalRuntimeConfig =
          "string" === typeof bootstrapScriptContent
            ? void 0
            : bootstrapScriptContent.integrity),
        JSCompiler_inline_result.push(
          '<script type="module" src="',
          escapeTextForBrowser(
            "string" === typeof bootstrapScriptContent
              ? bootstrapScriptContent
              : bootstrapScriptContent.src
          )
        ),
        externalRuntimeConfig &&
          JSCompiler_inline_result.push(
            '" integrity="',
            escapeTextForBrowser(externalRuntimeConfig)
          ),
        JSCompiler_inline_result.push('" async="">\x3c/script>');
  JSCompiler_inline_result = {
    bootstrapChunks: JSCompiler_inline_result,
    placeholderPrefix: identifierPrefix + "P:",
    segmentPrefix: identifierPrefix + "S:",
    boundaryPrefix: identifierPrefix + "B:",
    idPrefix: identifierPrefix,
    nextSuspenseID: 0,
    streamingFormat: streamingFormat,
    startInlineScript: "<script>",
    instructions: 0,
    externalRuntimeScript: externalRuntimeScript,
    htmlChunks: null,
    headChunks: null,
    hasBody: !1,
    charsetChunks: [],
    preconnectChunks: [],
    preloadChunks: [],
    hoistableChunks: [],
    stylesToHoist: !1,
    nonce: void 0
  };
  bootstrapModules = createFormatContext(0, null, !1);
  externalRuntimeScript = options ? options.progressiveChunkSize : void 0;
  streamingFormat = options.onError;
  ReactDOMCurrentDispatcher.current = ReactDOMServerDispatcher;
  options = [];
  identifierPrefix = new Set();
  bootstrapScripts = {
    preloadsMap: new Map(),
    preconnectsMap: new Map(),
    stylesMap: new Map(),
    scriptsMap: new Map(),
    preconnects: new Set(),
    fontPreloads: new Set(),
    precedences: new Map(),
    stylePrecedences: new Map(),
    usedStylesheets: new Set(),
    scripts: new Set(),
    usedScripts: new Set(),
    explicitStylesheetPreloads: new Set(),
    explicitScriptPreloads: new Set(),
    explicitOtherPreloads: new Set(),
    boundaryResources: null
  };
  JSCompiler_inline_result = {
    destination: null,
    flushScheduled: !1,
    responseState: JSCompiler_inline_result,
    progressiveChunkSize:
      void 0 === externalRuntimeScript ? 12800 : externalRuntimeScript,
    status: 0,
    fatalError: null,
    nextSegmentId: 0,
    allPendingTasks: 0,
    pendingRootTasks: 0,
    resources: bootstrapScripts,
    completedRootSegment: null,
    abortableTasks: identifierPrefix,
    pingedTasks: options,
    clientRenderedBoundaries: [],
    completedBoundaries: [],
    partialBoundaries: [],
    onError: void 0 === streamingFormat ? defaultErrorHandler : streamingFormat,
    onAllReady: noop,
    onShellReady: noop,
    onShellError: noop,
    onFatalError: noop
  };
  bootstrapModules = createPendingSegment(
    JSCompiler_inline_result,
    0,
    null,
    bootstrapModules,
    !1,
    !1
  );
  bootstrapModules.parentFlushed = !0;
  children = createTask(
    JSCompiler_inline_result,
    null,
    children,
    null,
    bootstrapModules,
    identifierPrefix,
    emptyContextObject,
    null,
    emptyTreeContext
  );
  options.push(children);
  JSCompiler_inline_result.flushScheduled =
    null !== JSCompiler_inline_result.destination;
  if (destination.fatal) throw destination.error;
  return { destination: destination, request: JSCompiler_inline_result };
};