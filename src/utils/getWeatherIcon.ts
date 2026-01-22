import sunnyIcon from "../assets/images/icon-sunny.webp";
import drizzleIcon from "../assets/images/icon-drizzle.webp";
import fogIcon from "../assets/images/icon-fog.webp";
import overCastIcon from "../assets/images/icon-overcast.webp";
import partlyCloudyIcon from "../assets/images/icon-partly-cloudy.webp";
import rainIcon from "../assets/images/icon-rain.webp";
import snowIcon from "../assets/images/icon-snow.webp";
import stormIcon from "../assets/images/icon-storm.webp";

export function getWeatherIcon(code: number): string {
  if (code === 0) {
    return sunnyIcon;
  }
  if (code === 1) {
    return partlyCloudyIcon;
  }
  if (code === 2) {
    return partlyCloudyIcon;
  }
  if (code === 3) {
    return overCastIcon;
  }
  if (code === 45 || code === 48) {
    return fogIcon;
  }
  if (code >= 51 && code <= 57) {
    return drizzleIcon;
  }
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return rainIcon;
  }
  if (code >= 71 && code <= 77) {
    return snowIcon;
  }
  if (code >= 95 && code <= 99) {
    return stormIcon;
  }
  return partlyCloudyIcon;
}
