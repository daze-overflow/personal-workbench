/* 课程矢量图解注册中心（支持嵌入正文右侧伴读 is-inline 与跨栏大图 is-wide，后续可扩展数电/模电） */
(function () {
  var registry = Object.create(null);

  function register(courseId, entries) {
    if (!entries || typeof entries !== "object") return;
    Object.keys(entries).forEach(function (sectionId) {
      var spec = entries[sectionId];
      if (!spec) return;
      registry[sectionId] = {
        courseId: courseId,
        layout: spec.layout === "inline" ? "inline" : "wide",
        placement: spec.placement || (spec.layout === "inline" ? "beside-prose" : "before-formula"),
        caption: spec.caption || "",
        ariaLabel: spec.ariaLabel || spec.caption || "课程概念图解",
        svg: spec.svg || ""
      };
    });
  }

  function get(sectionId) {
    return sectionId && registry[sectionId] ? registry[sectionId] : null;
  }

  function createElement(sectionId) {
    var spec = get(sectionId);
    if (!spec || !spec.svg) return null;

    var wrap = document.createElement("div");
    wrap.className = "lesson-visual is-" + spec.layout;
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", spec.ariaLabel);

    var canvas = document.createElement("div");
    canvas.className = "lesson-visual-canvas";
    canvas.innerHTML = spec.svg;
    wrap.appendChild(canvas);

    if (spec.caption) {
      var caption = document.createElement("div");
      caption.className = "lesson-visual-caption";
      caption.textContent = spec.caption;
      wrap.appendChild(caption);
    }

    return wrap;
  }

  register("signals", {
    "signals-intro-system": {
      layout: "wide",
      placement: "before-formula",
      caption: "图 0-1  信号处理系统的输入-输出映射与三域分析视角",
      svg: [
        '<svg viewBox="0 0 640 166" xmlns="http://www.w3.org/2000/svg">',
        '  <g stroke="var(--line-strong)" stroke-width="1.4" fill="none">',
        '    <rect x="44" y="20" width="120" height="44" rx="10" fill="var(--panel-2)"/>',
        '    <rect x="242" y="14" width="156" height="56" rx="12" fill="var(--accent-soft)" stroke="var(--accent)"/>',
        '    <rect x="476" y="20" width="120" height="44" rx="10" fill="var(--panel-2)"/>',
        '    <line x1="164" y1="42" x2="234" y2="42" stroke="var(--ink-soft)" stroke-width="1.6"/>',
        '    <polygon points="234,37 242,42 234,47" fill="var(--ink-soft)" stroke="none"/>',
        '    <line x1="398" y1="42" x2="468" y2="42" stroke="var(--ink-soft)" stroke-width="1.6"/>',
        '    <polygon points="468,37 476,42 468,47" fill="var(--ink-soft)" stroke="none"/>',
        '    <rect x="44" y="96" width="166" height="50" rx="9" fill="var(--panel-2)" stroke="var(--line)"/>',
        '    <rect x="237" y="96" width="166" height="50" rx="9" fill="var(--panel-2)" stroke="var(--line)"/>',
        '    <rect x="430" y="96" width="166" height="50" rx="9" fill="var(--panel-2)" stroke="var(--line)"/>',
        '  </g>',
        '  <g text-anchor="middle" font-family="var(--sans)">',
        '    <text x="104" y="39" font-size="12" font-weight="700" fill="var(--ink)">输入信号</text>',
        '    <text x="104" y="55" font-size="11" font-family="var(--mono)" fill="var(--ink-soft)">x(t) / x[n]</text>',
        '    <text x="320" y="38" font-size="13" font-weight="700" fill="var(--accent-ink)">系统处理规则 T{·}</text>',
        '    <text x="320" y="56" font-size="11" font-family="var(--mono)" fill="var(--ink-soft)">y = T{x}</text>',
        '    <text x="536" y="39" font-size="12" font-weight="700" fill="var(--ink)">输出响应</text>',
        '    <text x="536" y="55" font-size="11" font-family="var(--mono)" fill="var(--ink-soft)">y(t) / y[n]</text>',
        '    <text x="127" y="117" font-size="11.5" font-weight="700" fill="var(--ink)">时域视角</text>',
        '    <text x="127" y="135" font-size="10.5" fill="var(--ink-soft)">波形随时间演进 · 卷积</text>',
        '    <text x="320" y="117" font-size="11.5" font-weight="700" fill="var(--ink)">频域视角</text>',
        '    <text x="320" y="135" font-size="10.5" fill="var(--ink-soft)">频率成分与带宽 · H(jω)</text>',
        '    <text x="513" y="117" font-size="11.5" font-weight="700" fill="var(--ink)">复频域 / z 域</text>',
        '    <text x="513" y="135" font-size="10.5" fill="var(--ink-soft)">极零点与因果稳定 · H(s)</text>',
        '  </g>',
        '</svg>'
      ].join("\n")
    },

    "signals-ch1-time-basic": {
      layout: "inline",
      placement: "beside-prose",
      caption: "图 1-1  旋转单位复向量与实部余弦波形投影",
      svg: [
        '<svg viewBox="0 0 320 198" xmlns="http://www.w3.org/2000/svg">',
        '  <g fill="none">',
        '    <line x1="16" y1="98" x2="148" y2="98" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <line x1="80" y1="26" x2="80" y2="170" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <polygon points="148,95 154,98 148,101" fill="var(--ink-faint)"/>',
        '    <polygon points="77,26 80,20 83,26" fill="var(--ink-faint)"/>',
        '    <circle cx="80" cy="98" r="52" stroke="var(--ink-faint)" stroke-width="1.2" stroke-dasharray="3 3"/>',
        '    <path d="M 96 98 A 16 16 0 0 0 91.5 86.8" stroke="var(--warm)" stroke-width="1.4"/>',
        '    <line x1="115.4" y1="60.1" x2="174" y2="60.1" stroke="var(--ink-faint)" stroke-width="1.1" stroke-dasharray="3 3"/>',
        '    <line x1="80" y1="98" x2="115.4" y2="60.1" stroke="var(--accent)" stroke-width="2.1"/>',
        '    <circle cx="115.4" cy="60.1" r="3.6" fill="var(--accent)"/>',
        '    <line x1="172" y1="98" x2="304" y2="98" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <line x1="174" y1="34" x2="174" y2="162" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <polygon points="304,95 310,98 304,101" fill="var(--ink-faint)"/>',
        '    <path d="M 174 60.1 Q 194 36 208 60.1 T 242 135.9 T 276 60.1 T 300 46" stroke="var(--accent)" stroke-width="1.9"/>',
        '    <circle cx="174" cy="60.1" r="3.2" fill="var(--accent)"/>',
        '  </g>',
        '  <g font-family="var(--sans)" font-size="10.5">',
        '    <text x="86" y="26" fill="var(--ink-soft)">Im</text>',
        '    <text x="142" y="112" fill="var(--ink-soft)">Re</text>',
        '    <text x="100" y="92" fill="var(--warm)" font-size="10">ω₀t</text>',
        '    <text x="118" y="52" fill="var(--accent-ink)" font-weight="700" font-family="var(--mono)">e^(jω₀t)</text>',
        '    <text x="236" y="28" text-anchor="middle" fill="var(--ink-soft)" font-weight="600">投影 cos(ω₀t)</text>',
        '    <text x="302" y="112" fill="var(--ink-soft)">t</text>',
        '  </g>',
        '</svg>'
      ].join("\n")
    },

    "signals-ch1-time-singular": {
      layout: "inline",
      placement: "beside-prose",
      caption: "图 1-2  单位阶跃 u(t) 与等面积脉冲极限 → 冲激 δ(t)",
      svg: [
        '<svg viewBox="0 0 320 212" xmlns="http://www.w3.org/2000/svg">',
        '  <g fill="none">',
        '    <line x1="36" y1="74" x2="290" y2="74" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <line x1="150" y1="18" x2="150" y2="86" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <polygon points="290,71 296,74 290,77" fill="var(--ink-faint)"/>',
        '    <polyline points="44,74 150,74" stroke="var(--ink)" stroke-width="2"/>',
        '    <polyline points="150,34 282,34" stroke="var(--accent)" stroke-width="2.1"/>',
        '    <line x1="150" y1="74" x2="150" y2="34" stroke="var(--accent)" stroke-width="1.2" stroke-dasharray="3 2"/>',
        '    <circle cx="150" cy="74" r="2.8" fill="var(--panel)" stroke="var(--ink)" stroke-width="1.5"/>',
        '    <circle cx="150" cy="34" r="3" fill="var(--accent)"/>',
        '    <line x1="32" y1="98" x2="288" y2="98" stroke="var(--hairline)" stroke-width="1"/>',
        '    <line x1="36" y1="184" x2="290" y2="184" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <line x1="150" y1="108" x2="150" y2="196" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <polygon points="290,181 296,184 290,187" fill="var(--ink-faint)"/>',
        '    <rect x="112" y="160" width="76" height="24" stroke="var(--ink-faint)" stroke-width="1.1" stroke-dasharray="3 3"/>',
        '    <rect x="134" y="136" width="32" height="48" stroke="var(--ink-soft)" stroke-width="1.2" fill="var(--accent-soft)" fill-opacity="0.45"/>',
        '    <line x1="150" y1="184" x2="150" y2="118" stroke="var(--accent)" stroke-width="2.4"/>',
        '    <polygon points="145,121 150,110 155,121" fill="var(--accent)"/>',
        '  </g>',
        '  <g font-family="var(--sans)" font-size="10.5">',
        '    <text x="158" y="25" fill="var(--accent-ink)" font-weight="700">u(t)</text>',
        '    <text x="138" y="38" text-anchor="end" fill="var(--ink-soft)">1</text>',
        '    <text x="142" y="88" text-anchor="end" fill="var(--ink-faint)">0</text>',
        '    <text x="160" y="120" fill="var(--accent-ink)" font-weight="700">δ(t)</text>',
        '    <text x="194" y="154" fill="var(--ink-soft)" font-size="10">面积 = τ·(1/τ) = 1</text>',
        '    <text x="194" y="170" fill="var(--ink-faint)" font-size="10">脉宽 τ → 0</text>',
        '    <text x="290" y="198" fill="var(--ink-soft)">t</text>',
        '  </g>',
        '</svg>'
      ].join("\n")
    },

    "signals-ch1-time-ops": {
      layout: "wide",
      placement: "before-formula",
      caption: "图 1-3  斜升信号 x(t) = t[u(t)−u(t−1)] 的压缩 x(2t) 与翻转平移 x(2−t)",
      svg: [
        '<svg viewBox="7 7 646 138" xmlns="http://www.w3.org/2000/svg">',
        '  <g fill="none">',
        '    <rect x="8" y="8" width="204" height="136" rx="10" fill="var(--panel-2)" stroke="var(--line)"/>',
        '    <rect x="228" y="8" width="204" height="136" rx="10" fill="var(--panel-2)" stroke="var(--line)"/>',
        '    <rect x="448" y="8" width="204" height="136" rx="10" fill="var(--panel-2)" stroke="var(--line)"/>',
        '    <line x1="28" y1="110" x2="194" y2="110" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <line x1="76" y1="36" x2="76" y2="122" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <polyline points="34,110 76,110 124,52 124,110 186,110" stroke="var(--ink)" stroke-width="2"/>',
        '    <line x1="248" y1="110" x2="414" y2="110" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <line x1="296" y1="36" x2="296" y2="122" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <polyline points="296,110 344,52 344,110" stroke="var(--ink-faint)" stroke-width="1.1" stroke-dasharray="3 3"/>',
        '    <polyline points="254,110 296,110 320,52 320,110 406,110" stroke="var(--accent)" stroke-width="2.1"/>',
        '    <line x1="468" y1="110" x2="634" y2="110" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <line x1="496" y1="36" x2="496" y2="122" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <polyline points="496,110 544,52 544,110" stroke="var(--ink-faint)" stroke-width="1.1" stroke-dasharray="3 3"/>',
        '    <polyline points="474,110 544,110 544,52 592,110 626,110" stroke="var(--warm)" stroke-width="2.1"/>',
        '  </g>',
        '  <g font-family="var(--sans)" font-size="10.5">',
        '    <text x="110" y="27" text-anchor="middle" font-weight="700" fill="var(--ink)">原信号 x(t) · 区间 [0, 1]</text>',
        '    <text x="76" y="126" text-anchor="middle" fill="var(--ink-faint)">0</text>',
        '    <text x="124" y="126" text-anchor="middle" fill="var(--ink-soft)">1</text>',
        '    <text x="330" y="27" text-anchor="middle" font-weight="700" fill="var(--accent-ink)">压缩 x(2t) · 区间 [0, 0.5]</text>',
        '    <text x="296" y="126" text-anchor="middle" fill="var(--ink-faint)">0</text>',
        '    <text x="320" y="126" text-anchor="middle" fill="var(--accent-ink)" font-weight="700">0.5</text>',
        '    <text x="348" y="126" text-anchor="middle" fill="var(--ink-faint)">1</text>',
        '    <text x="550" y="27" text-anchor="middle" font-weight="700" fill="var(--warm)">翻转右移 x(2−t) · [1, 2]</text>',
        '    <text x="496" y="126" text-anchor="middle" fill="var(--ink-faint)">0</text>',
        '    <text x="544" y="126" text-anchor="middle" fill="var(--warm)" font-weight="700">1</text>',
        '    <text x="592" y="126" text-anchor="middle" fill="var(--warm)" font-weight="700">2</text>',
        '  </g>',
        '</svg>'
      ].join("\n")
    },

    "signals-ch1-time-convolution": {
      layout: "wide",
      placement: "before-formula",
      caption: "图 1-4  连续卷积图解：翻转 h(−τ)、平移 t 得 h(t−τ)、重叠积分得 y(t)",
      svg: [
        '<svg viewBox="7 7 646 136" xmlns="http://www.w3.org/2000/svg">',
        '  <g fill="none">',
        '    <rect x="8" y="8" width="204" height="134" rx="10" fill="var(--panel-2)" stroke="var(--line)"/>',
        '    <rect x="228" y="8" width="204" height="134" rx="10" fill="var(--panel-2)" stroke="var(--line)"/>',
        '    <rect x="448" y="8" width="204" height="134" rx="10" fill="var(--panel-2)" stroke="var(--line)"/>',
        '    <line x1="24" y1="108" x2="196" y2="108" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <rect x="92" y="64" width="60" height="44" stroke="var(--ink)" stroke-width="1.6"/>',
        '    <path d="M 38 108 L 38 56 Q 64 56 80 108" stroke="var(--accent)" stroke-width="1.8" stroke-dasharray="4 2"/>',
        '    <line x1="56" y1="46" x2="112" y2="46" stroke="var(--accent)" stroke-width="1.5"/>',
        '    <polygon points="112,42 120,46 112,50" fill="var(--accent)"/>',
        '    <line x1="244" y1="108" x2="416" y2="108" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <polygon points="312,108 312,64 344,64 344,108" fill="var(--accent-soft)" stroke="none"/>',
        '    <rect x="312" y="64" width="60" height="44" stroke="var(--ink)" stroke-width="1.6"/>',
        '    <path d="M 284 108 L 284 56 Q 320 56 348 108" stroke="var(--accent)" stroke-width="1.9"/>',
        '    <line x1="464" y1="108" x2="636" y2="108" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <path d="M 476 108 C 508 108, 526 42, 548 42 C 570 42, 588 108, 622 108" stroke="var(--accent)" stroke-width="2.1"/>',
        '    <line x1="548" y1="42" x2="548" y2="108" stroke="var(--warm)" stroke-width="1.2" stroke-dasharray="3 2"/>',
        '    <circle cx="548" cy="42" r="3.4" fill="var(--warm)"/>',
        '  </g>',
        '  <g font-family="var(--sans)" font-size="10.5">',
        '    <text x="110" y="27" text-anchor="middle" font-weight="700" fill="var(--ink)">1. 翻转平移 h(t−τ)</text>',
        '    <text x="64" y="96" text-anchor="middle" fill="var(--accent-ink)" font-size="10">h(t−τ)</text>',
        '    <text x="122" y="96" text-anchor="middle" fill="var(--ink-soft)" font-size="10">x(τ)</text>',
        '    <text x="84" y="40" text-anchor="middle" fill="var(--accent-ink)" font-size="10">右扫 t</text>',
        '    <text x="330" y="27" text-anchor="middle" font-weight="700" fill="var(--accent-ink)">2. 重叠乘积与积分</text>',
        '    <text x="328" y="125" text-anchor="middle" fill="var(--accent-ink)" font-size="10">阴影面积 = y(t)</text>',
        '    <text x="550" y="27" text-anchor="middle" font-weight="700" fill="var(--ink)">3. 扫描输出波形 y(t)</text>',
        '    <text x="548" y="125" text-anchor="middle" fill="var(--warm)" font-size="10">当前时刻 t</text>',
        '  </g>',
        '</svg>'
      ].join("\n")
    },

    "signals-ch1-frequency": {
      layout: "wide",
      placement: "before-formula",
      caption: "图 1-5  矩形脉冲与 sinc 频谱的对偶关系（时宽 τ 越窄，主瓣 2/τ 越宽）",
      svg: [
        '<svg viewBox="7 7 646 138" xmlns="http://www.w3.org/2000/svg">',
        '  <g fill="none">',
        '    <rect x="8" y="8" width="268" height="136" rx="10" fill="var(--panel-2)" stroke="var(--line)"/>',
        '    <rect x="384" y="8" width="268" height="136" rx="10" fill="var(--panel-2)" stroke="var(--line)"/>',
        '    <line x1="28" y1="112" x2="256" y2="112" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <line x1="142" y1="36" x2="142" y2="122" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <rect x="110" y="48" width="64" height="64" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2"/>',
        '    <line x1="292" y1="76" x2="368" y2="76" stroke="var(--ink-soft)" stroke-width="1.6"/>',
        '    <polygon points="294,71 284,76 294,81" fill="var(--ink-soft)"/>',
        '    <polygon points="366,71 376,76 366,81" fill="var(--ink-soft)"/>',
        '    <line x1="402" y1="112" x2="636" y2="112" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <line x1="518" y1="34" x2="518" y2="122" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <path d="M 414 112 Q 430 92 446 112 Q 460 124 474 112 C 492 92, 502 42, 518 42 C 534 42, 544 92, 562 112 Q 576 124 590 112 Q 606 92 622 112" stroke="var(--accent)" stroke-width="2.1"/>',
        '    <circle cx="474" cy="112" r="2.8" fill="var(--warm)"/>',
        '    <circle cx="562" cy="112" r="2.8" fill="var(--warm)"/>',
        '  </g>',
        '  <g font-family="var(--sans)" font-size="10.5">',
        '    <text x="142" y="26" text-anchor="middle" font-weight="700" fill="var(--ink)">时域矩形脉冲 x(t)（宽 τ）</text>',
        '    <text x="110" y="128" text-anchor="middle" fill="var(--ink-soft)">−τ/2</text>',
        '    <text x="174" y="128" text-anchor="middle" fill="var(--ink-soft)">+τ/2</text>',
        '    <text x="330" y="64" text-anchor="middle" font-weight="700" fill="var(--accent-ink)" font-size="12">ℱ</text>',
        '    <text x="518" y="26" text-anchor="middle" font-weight="700" fill="var(--ink)">频谱幅值 |X(f)| = τ·|sinc(fτ)|</text>',
        '    <text x="474" y="128" text-anchor="middle" fill="var(--warm)" font-weight="700">−1/τ</text>',
        '    <text x="562" y="128" text-anchor="middle" fill="var(--warm)" font-weight="700">+1/τ</text>',
        '  </g>',
        '</svg>'
      ].join("\n")
    },

    "signals-ch1-laplace": {
      layout: "inline",
      placement: "beside-prose",
      caption: "图 1-6  s 平面与右半平面收敛域（含 jω 轴即对应稳态频响）",
      svg: [
        '<svg viewBox="0 0 320 198" xmlns="http://www.w3.org/2000/svg">',
        '  <g fill="none">',
        '    <rect x="132" y="22" width="154" height="154" fill="var(--accent-soft)" fill-opacity="0.72"/>',
        '    <line x1="28" y1="99" x2="292" y2="99" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <line x1="194" y1="20" x2="194" y2="178" stroke="var(--accent)" stroke-width="2"/>',
        '    <polygon points="292,96 298,99 292,102" fill="var(--ink-faint)"/>',
        '    <polygon points="191,20 194,14 197,20" fill="var(--accent)"/>',
        '    <line x1="132" y1="22" x2="132" y2="176" stroke="var(--ink-soft)" stroke-width="1.2" stroke-dasharray="4 3"/>',
        '    <path d="M 127 60 L 137 70 M 137 60 L 127 70" stroke="var(--warm)" stroke-width="2"/>',
        '    <path d="M 127 128 L 137 138 M 137 128 L 127 138" stroke="var(--warm)" stroke-width="2"/>',
        '  </g>',
        '  <g font-family="var(--sans)" font-size="10.5">',
        '    <text x="284" y="114" fill="var(--ink-soft)">σ</text>',
        '    <text x="202" y="26" fill="var(--accent-ink)" font-weight="700">jω 轴</text>',
        '    <text x="118" y="114" text-anchor="end" fill="var(--ink-faint)">σ₀</text>',
        '    <text x="242" y="58" text-anchor="middle" fill="var(--accent-ink)" font-weight="700">ROC</text>',
        '    <text x="242" y="74" text-anchor="middle" fill="var(--ink-soft)" font-size="10">Re(s) &gt; σ₀</text>',
        '    <text x="116" y="68" text-anchor="end" fill="var(--warm)" font-size="10">极点 ×</text>',
        '  </g>',
        '</svg>'
      ].join("\n")
    },

    "signals-ch2-sampling": {
      layout: "wide",
      placement: "before-formula",
      caption: "图 2-1  采样后的频谱周期延拓：过采样无混叠 (fs > 2fmax) 与欠采样混叠 (fs < 2fmax)",
      svg: [
        '<svg viewBox="7 7 646 140" xmlns="http://www.w3.org/2000/svg">',
        '  <g fill="none">',
        '    <rect x="8" y="8" width="314" height="138" rx="10" fill="var(--panel-2)" stroke="var(--line)"/>',
        '    <rect x="338" y="8" width="314" height="138" rx="10" fill="var(--panel-2)" stroke="var(--line)"/>',
        '    <line x1="22" y1="112" x2="306" y2="112" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <polygon points="34,112 72,56 110,112" stroke="var(--ink-faint)" stroke-width="1.4" fill="var(--panel)"/>',
        '    <polygon points="126,112 164,56 202,112" stroke="var(--accent)" stroke-width="1.8" fill="var(--accent-soft)"/>',
        '    <polygon points="218,112 256,56 294,112" stroke="var(--ink-faint)" stroke-width="1.4" fill="var(--panel)"/>',
        '    <rect x="118" y="42" width="92" height="70" rx="4" stroke="var(--accent)" stroke-width="1.2" stroke-dasharray="4 3"/>',
        '    <line x1="352" y1="112" x2="636" y2="112" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <polygon points="384,112 432,56 480,112" stroke="var(--ink-faint)" stroke-width="1.4"/>',
        '    <polygon points="448,112 496,56 544,112" stroke="var(--accent)" stroke-width="1.8" fill="var(--accent-soft)" fill-opacity="0.5"/>',
        '    <polygon points="512,112 560,56 608,112" stroke="var(--ink-faint)" stroke-width="1.4"/>',
        '    <polygon points="448,112 464,93 480,112" fill="var(--warm)" fill-opacity="0.72" stroke="var(--warm)" stroke-width="1"/>',
        '    <polygon points="512,112 528,93 544,112" fill="var(--warm)" fill-opacity="0.72" stroke="var(--warm)" stroke-width="1"/>',
        '  </g>',
        '  <g font-family="var(--sans)" font-size="10.5">',
        '    <text x="164" y="27" text-anchor="middle" font-weight="700" fill="var(--accent-ink)">无混叠 (fs &gt; 2fmax) · 理想低通可无失真恢复</text>',
        '    <text x="72" y="128" text-anchor="middle" fill="var(--ink-faint)">−fs</text>',
        '    <text x="164" y="128" text-anchor="middle" fill="var(--ink)">0</text>',
        '    <text x="256" y="128" text-anchor="middle" fill="var(--ink-faint)">+fs</text>',
        '    <text x="496" y="27" text-anchor="middle" font-weight="700" fill="var(--warm)">欠采样发生混叠 (fs &lt; 2fmax) · 相邻像频交叠</text>',
        '    <text x="464" y="88" text-anchor="middle" fill="var(--warm)" font-size="9.5" font-weight="700">混叠区</text>',
        '    <text x="528" y="88" text-anchor="middle" fill="var(--warm)" font-size="9.5" font-weight="700">混叠区</text>',
        '  </g>',
        '</svg>'
      ].join("\n")
    },

    "signals-ch2-z": {
      layout: "inline",
      placement: "beside-prose",
      caption: "图 2-2  z 平面因果收敛域 |z| > rmax 与单位圆（稳定判据）",
      svg: [
        '<svg viewBox="0 0 320 198" xmlns="http://www.w3.org/2000/svg">',
        '  <g fill="none">',
        '    <path d="M 38 22 H 282 V 176 H 38 Z M 194 99 A 34 34 0 1 0 126 99 A 34 34 0 1 0 194 99 Z" fill="var(--accent-soft)" fill-opacity="0.72" fill-rule="evenodd"/>',
        '    <line x1="28" y1="99" x2="290" y2="99" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <line x1="160" y1="18" x2="160" y2="180" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <circle cx="160" cy="99" r="62" stroke="var(--accent)" stroke-width="1.8" stroke-dasharray="4 3"/>',
        '    <circle cx="160" cy="99" r="34" stroke="var(--ink-soft)" stroke-width="1.2"/>',
        '    <path d="M 181 74 L 189 82 M 189 74 L 181 82" stroke="var(--warm)" stroke-width="2"/>',
        '    <path d="M 181 116 L 189 124 M 189 116 L 181 124" stroke="var(--warm)" stroke-width="2"/>',
        '  </g>',
        '  <g font-family="var(--sans)" font-size="10.5">',
        '    <text x="278" y="113" fill="var(--ink-soft)">Re(z)</text>',
        '    <text x="166" y="26" fill="var(--ink-soft)">Im(z)</text>',
        '    <text x="225" y="64" fill="var(--accent-ink)" font-weight="700">|z| = 1 (DTFT)</text>',
        '    <text x="160" y="152" text-anchor="middle" fill="var(--ink-soft)" font-size="9.5">r_max &lt; 1 ⇒ 因果稳定</text>',
        '  </g>',
        '</svg>'
      ].join("\n")
    },

    "signals-ch3-time": {
      layout: "inline",
      placement: "beside-prose",
      caption: "图 3-1  LTI 系统完全由单位冲激响应 h(t) 唯一刻画",
      svg: [
        '<svg viewBox="0 0 320 176" xmlns="http://www.w3.org/2000/svg">',
        '  <g fill="none">',
        '    <line x1="34" y1="62" x2="34" y2="28" stroke="var(--accent)" stroke-width="2"/>',
        '    <polygon points="30,31 34,23 38,31" fill="var(--accent)"/>',
        '    <line x1="20" y1="62" x2="54" y2="62" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <line x1="58" y1="45" x2="96" y2="45" stroke="var(--ink-soft)" stroke-width="1.5"/>',
        '    <polygon points="96,41 104,45 96,49" fill="var(--ink-soft)"/>',
        '    <rect x="106" y="25" width="98" height="40" rx="9" fill="var(--panel)" stroke="var(--line-strong)" stroke-width="1.4"/>',
        '    <line x1="204" y1="45" x2="228" y2="45" stroke="var(--ink-soft)" stroke-width="1.5"/>',
        '    <polygon points="228,41 236,45 228,49" fill="var(--ink-soft)"/>',
        '    <path d="M 244 62 L 244 30 Q 256 32 296 60" stroke="var(--accent)" stroke-width="1.9"/>',
        '    <line x1="238" y1="62" x2="300" y2="62" stroke="var(--line-strong)" stroke-width="1.2"/>',
        '    <line x1="22" y1="88" x2="298" y2="88" stroke="var(--hairline)" stroke-width="1"/>',
        '    <line x1="68" y1="130" x2="96" y2="130" stroke="var(--ink-soft)" stroke-width="1.5"/>',
        '    <polygon points="96,126 104,130 96,134" fill="var(--ink-soft)"/>',
        '    <rect x="106" y="108" width="98" height="44" rx="9" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.4"/>',
        '    <line x1="204" y1="130" x2="228" y2="130" stroke="var(--ink-soft)" stroke-width="1.5"/>',
        '    <polygon points="228,126 236,130 228,134" fill="var(--ink-soft)"/>',
        '  </g>',
        '  <g font-family="var(--sans)" font-size="11">',
        '    <text x="155" y="49" text-anchor="middle" font-weight="700" fill="var(--ink)">LTI 系统</text>',
        '    <text x="272" y="34" text-anchor="middle" fill="var(--accent-ink)" font-weight="700">h(t)</text>',
        '    <text x="46" y="54" fill="var(--accent-ink)" font-size="10">δ(t)</text>',
        '    <text x="42" y="134" text-anchor="middle" font-weight="600" fill="var(--ink)">x(t)</text>',
        '    <text x="155" y="134" text-anchor="middle" font-weight="700" fill="var(--accent-ink)">T{·} = * h(t)</text>',
        '    <text x="274" y="128" text-anchor="middle" font-weight="700" fill="var(--ink)">y(t) = x * h</text>',
        '    <text x="274" y="144" text-anchor="middle" font-size="9.5" fill="var(--ink-soft)">零状态响应</text>',
        '  </g>',
        '</svg>'
      ].join("\n")
    },

    "signals-ch4-specs": {
      layout: "wide",
      placement: "before-formula",
      caption: "图 4-1  低通滤波器幅频响应容差模板：通带波动、过渡带与阻带衰减",
      svg: [
        '<svg viewBox="0 0 660 172" xmlns="http://www.w3.org/2000/svg">',
        '  <g fill="none">',
        '    <rect x="86" y="20" width="194" height="18" fill="var(--warm)" fill-opacity="0.14"/>',
        '    <rect x="86" y="58" width="194" height="86" fill="var(--warm)" fill-opacity="0.14"/>',
        '    <rect x="380" y="20" width="224" height="104" fill="var(--warm)" fill-opacity="0.14"/>',
        '    <line x1="86" y1="144" x2="616" y2="144" stroke="var(--line-strong)" stroke-width="1.3"/>',
        '    <line x1="86" y1="18" x2="86" y2="144" stroke="var(--line-strong)" stroke-width="1.3"/>',
        '    <line x1="86" y1="38" x2="280" y2="38" stroke="var(--ink-soft)" stroke-width="1.2"/>',
        '    <line x1="86" y1="58" x2="280" y2="58" stroke="var(--ink-soft)" stroke-width="1.2"/>',
        '    <line x1="380" y1="124" x2="604" y2="124" stroke="var(--ink-soft)" stroke-width="1.2"/>',
        '    <line x1="280" y1="20" x2="280" y2="144" stroke="var(--accent)" stroke-width="1.2" stroke-dasharray="4 3"/>',
        '    <line x1="380" y1="20" x2="380" y2="144" stroke="var(--ink-faint)" stroke-width="1.2" stroke-dasharray="4 3"/>',
        '    <path d="M 86 48 Q 134 40 182 48 Q 230 56 280 50 C 316 48, 344 116, 380 128 Q 436 138 492 130 T 602 135" stroke="var(--accent)" stroke-width="2.2"/>',
        '  </g>',
        '  <g font-family="var(--sans)" font-size="10.5">',
        '    <text x="78" y="42" text-anchor="end" fill="var(--ink-soft)">1+δp</text>',
        '    <text x="78" y="62" text-anchor="end" fill="var(--ink-soft)">1−δp</text>',
        '    <text x="78" y="128" text-anchor="end" fill="var(--ink-soft)">δs</text>',
        '    <text x="183" y="98" text-anchor="middle" font-weight="700" fill="var(--accent-ink)">通带 Passband</text>',
        '    <text x="330" y="98" text-anchor="middle" font-weight="700" fill="var(--ink-soft)">过渡带</text>',
        '    <text x="492" y="98" text-anchor="middle" font-weight="700" fill="var(--ink-soft)">阻带 Stopband</text>',
        '    <text x="280" y="159" text-anchor="middle" font-weight="700" fill="var(--accent-ink)">ωp</text>',
        '    <text x="380" y="159" text-anchor="middle" font-weight="700" fill="var(--ink-soft)">ωs</text>',
        '    <text x="614" y="159" fill="var(--ink-faint)">ω</text>',
        '  </g>',
        '</svg>'
      ].join("\n")
    },

    "signals-ch5-spectrum": {
      layout: "wide",
      placement: "before-formula",
      caption: "图 5-1  维纳-辛钦定理及 LTI 系统功率谱密度传递关系",
      svg: [
        '<svg viewBox="0 0 640 148" xmlns="http://www.w3.org/2000/svg">',
        '  <g fill="none">',
        '    <rect x="64" y="16" width="186" height="44" rx="9" fill="var(--panel-2)" stroke="var(--line-strong)"/>',
        '    <rect x="390" y="16" width="186" height="44" rx="9" fill="var(--panel-2)" stroke="var(--line-strong)"/>',
        '    <line x1="258" y1="38" x2="382" y2="38" stroke="var(--accent)" stroke-width="1.6"/>',
        '    <polygon points="260,33 250,38 260,43" fill="var(--accent)"/>',
        '    <polygon points="380,33 390,38 380,43" fill="var(--accent)"/>',
        '    <rect x="64" y="84" width="136" height="46" rx="9" fill="var(--panel-2)" stroke="var(--line)"/>',
        '    <rect x="248" y="82" width="144" height="50" rx="10" fill="var(--accent-soft)" stroke="var(--accent)"/>',
        '    <rect x="440" y="84" width="136" height="46" rx="9" fill="var(--panel-2)" stroke="var(--line)"/>',
        '    <line x1="200" y1="107" x2="240" y2="107" stroke="var(--ink-soft)" stroke-width="1.5"/>',
        '    <polygon points="240,103 248,107 240,111" fill="var(--ink-soft)"/>',
        '    <line x1="392" y1="107" x2="432" y2="107" stroke="var(--ink-soft)" stroke-width="1.5"/>',
        '    <polygon points="432,103 440,107 432,111" fill="var(--ink-soft)"/>',
        '  </g>',
        '  <g text-anchor="middle" font-family="var(--sans)">',
        '    <text x="157" y="42" font-size="12" font-weight="700" fill="var(--ink)">自相关函数 R_X(τ)</text>',
        '    <text x="320" y="30" font-size="10.5" font-weight="700" fill="var(--accent-ink)">维纳-辛钦 ℱ / ℱ⁻¹</text>',
        '    <text x="483" y="42" font-size="12" font-weight="700" fill="var(--ink)">功率谱密度 S_X(ω)</text>',
        '    <text x="132" y="103" font-size="11.5" font-weight="700" fill="var(--ink)">输入功率谱</text>',
        '    <text x="132" y="120" font-size="11" font-family="var(--mono)" fill="var(--ink-soft)">S_X(ω)</text>',
        '    <text x="320" y="103" font-size="11.5" font-weight="700" fill="var(--accent-ink)">平方幅频整形</text>',
        '    <text x="320" y="120" font-size="11" font-family="var(--mono)" fill="var(--accent-ink)">|H(jω)|²</text>',
        '    <text x="508" y="103" font-size="11.5" font-weight="700" fill="var(--ink)">输出功率谱</text>',
        '    <text x="508" y="120" font-size="11" font-family="var(--mono)" fill="var(--ink-soft)">|H(jω)|² S_X(ω)</text>',
        '  </g>',
        '</svg>'
      ].join("\n")
    }
  });

  window.LessonVisuals = {
    register: register,
    get: get,
    createElement: createElement
  };
})();
