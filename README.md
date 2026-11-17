# Click Lightning

点击即炸开的黄色电弧特效：锯齿闪电、辉光、冲击环、火星，全部画在一张不阻挡交互的 canvas 上。零依赖、框架无关，空闲时自动停帧。

## 特性

- **单画布**：`pointer-events: none` 的全屏覆盖层，不产生布局偏移。
- **按需计数**：`rAF` 只在有粒子存活时运行，动画结束立即停帧并清空画布。
- **输入克制**：鼠标左键与触控笔触发；触屏点按跳过，不影响滚动；`[data-no-fx]` 区域不触发。
- **减弱模式**：`setMode("subtle")` 只保留一圈扩散光环，可作为"减弱动效"偏好。
- **系统偏好**：检测到 `prefers-reduced-motion: reduce` 时自动降级为光环。
- **可调参数**：颜色、规模、闪电条数、持续时间、辉光、火星、全屏闪。

## 使用

```ts
import { createClickLightning } from "click-lightning";

const lightning = createClickLightning(
	{
		color: "#ffd400",
		scale: 1,
		bolts: 8,
		duration: 220,
		glow: 1,
		sparks: true,
		screenFlash: true,
	},
	"full", // 初始模式："full" | "subtle"
);

// 访客偏好变化时切换（例如主题面板里的开关）
lightning.setMode("subtle");

// 运行时调整参数
lightning.setOptions({ color: "#ffcc00", scale: 0.8 });

// 卸载时清理监听与画布
lightning.destroy();
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `color` | `string` | `"#ffd400"` | 电弧颜色，支持 `#rgb` / `#rrggbb` |
| `scale` | `number` | `1` | 整体尺寸倍率，范围 0.1–3 |
| `bolts` | `number` | `8` | 辐射闪电条数，范围 3–24 |
| `duration` | `number` | `220` | 主干持续时间（毫秒），范围 80–1000 |
| `glow` | `number` | `1` | 辉光强度，0 关闭辉光，范围 0–2 |
| `sparks` | `boolean` | `true` | 是否喷出火星粒子 |
| `screenFlash` | `boolean` | `true` | 是否叠加轻微全屏闪 |
| `excludeSelector` | `string` | `"[data-no-fx]"` | 命中该选择器的元素内点击不触发 |
| `zIndex` | `number` | `9999` | 覆盖层层级 |

## 模式与无障碍

`full` 为完整放电；`subtle` 只有一圈 260ms 的扩散光环。两种模式下画布都不接收指针事件，也不会改变任何元素尺寸。系统开启"减少动态效果"时，即使当前是 `full` 也会自动使用光环。

## 本地开发

```bash
npm install
npm run dev        # 启动 demo（http://localhost:5173）
npm run typecheck  # 类型检查
npm run build      # 输出 dist/（ESM + .d.ts）
```

## License

MIT
