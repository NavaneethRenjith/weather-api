// Function to convert temperature from Kelvin to C
export function convertKelvinToCelcius(k: number): string {
    const c = Math.round(k - 273)
    return `${c} C`
} 