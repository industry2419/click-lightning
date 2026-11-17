import { createClickLightning, type ClickLightningMode } from "../src/index";

const lightning = createClickLightning(
	{ color: "#ffd400", scale: 1, bolts: 8 },
	"full",
);

const mode = document.querySelector<HTMLSelectElement>("#mode");
const color = document.querySelector<HTMLInputElement>("#color");
const scale = document.querySelector<HTMLInputElement>("#scale");
const bolts = document.querySelector<HTMLInputElement>("#bolts");
const scaleOut = document.querySelector<HTMLOutputElement>("#scaleOut");
const boltsOut = document.querySelector<HTMLOutputElement>("#boltsOut");

function sync() {
	if (!scale || !bolts) return;
	const scaleValue = Number(scale.value);
	const boltsValue = Number(bolts.value);
	if (scaleOut) scaleOut.value = `${scaleValue.toFixed(1)}×`;
	if (boltsOut) boltsOut.value = String(boltsValue);
	lightning.setOptions({
		color: color?.value ?? "#ffd400",
		scale: scaleValue,
		bolts: boltsValue,
	});
}

mode?.addEventListener("change", () => {
	lightning.setMode(mode.value as ClickLightningMode);
});
color?.addEventListener("input", sync);
scale?.addEventListener("input", sync);
bolts?.addEventListener("input", sync);

// Demo cleanup for HMR: rebuild the instance when the module is replaced.
if (import.meta.hot) {
	import.meta.hot.dispose(() => lightning.destroy());
}
