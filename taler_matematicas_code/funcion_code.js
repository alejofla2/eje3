// Función para reiniciar la página
document.getElementById("resetButton").addEventListener("click", () => {
    location.reload(); // Recargar la página
});

function clasificarTriangulo(a, b, c) {
    const tipoLados = (a === b && b === c) ? "Equilátero" :
                      (a === b || b === c || a === c) ? "Isósceles" : "Escaleno";

    const [x, y, z] = [a, b, c].sort((x, y) => x - y); // Ordenar lados
    const tipoAngulos = (x ** 2 + y ** 2 === z ** 2) ? "Rectángulo" :
                        (x ** 2 + y ** 2 > z ** 2) ? "Acutángulo" : "Obtuso";

    return { tipoLados, tipoAngulos };
}

function calcularAngulos(a, b, c) {
    const anguloA = Math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c)) * (180 / Math.PI);
    const anguloB = Math.acos((a ** 2 + c ** 2 - b ** 2) / (2 * a * c)) * (180 / Math.PI);
    const anguloC = 180 - anguloA - anguloB;
    return { anguloA: anguloA.toFixed(2), anguloB: anguloB.toFixed(2), anguloC: anguloC.toFixed(2) };
}
function dibujarTriangulo(a, b, c) {
    const canvas = document.getElementById("triangleCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const escala = 400 / Math.max(a, b, c);
    const [ladoA, ladoB, ladoC] = [a, b, c].map(lado => lado * escala);

    const x2 = ladoC, y2 = 0;
    const x3 = (ladoB ** 2 - ladoA ** 2 + ladoC ** 2) / (2 * ladoC);
    const y3 = Math.sqrt(Math.abs(ladoB ** 2 - x3 ** 2)); // Asegurarse de que no haya valores negativos

    // Dibujar el triángulo
    ctx.beginPath();
    ctx.moveTo(50, 450); // Punto inicial
    ctx.lineTo(50 + x2, 450 - y2); // Segundo punto
    ctx.lineTo(50 + x3, 450 - y3); // Tercer punto
    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "rgba(0, 215, 230, 0.2)";
    ctx.fill();

    // Calcular los ángulos
    const { anguloA, anguloB, anguloC } = calcularAngulos(a, b, c);

    // Mostrar los ángulos en el triángulo
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(`A: ${anguloA}°`, 40, 460); // Ángulo A
    ctx.fillText(`B: ${anguloB}°`, 50 + x2 - 30, 460); // Ángulo B (ajustado)
    ctx.fillText(`C: ${anguloC}°`, 50 + x3 + 10, 450 - y3 - 10); // Ángulo C

    // Mostrar los lados en el triángulo
    ctx.fillStyle = "red";
    ctx.font = "14px Arial";
    ctx.fillText(`C: ${c}`, 50 + x2 / 2, 455); // Lado C (base)
    ctx.fillText(`A: ${a}`, 50 + x3 / 2, 450 - y3 / 2 - 10); // Lado A
    ctx.fillText(`B: ${b}`, 50 + (x2 + x3) / 2, 450 - (y2 + y3) / 2 + 10); // Lado B
}
function mostrarInformacion(tipoLados, tipoAngulos) {
    document.getElementById("triangleInfo").innerHTML = `
        <p><strong>Tipo por Lados:</strong> ${tipoLados}</p>
        <p><strong>Tipo por Ángulos:</strong> ${tipoAngulos}</p>
    `;
}

function mostrarDatosIngresados(a, b, c) {
    document.getElementById("triangleInputs").innerHTML = `
        <p><strong>Lados ingresados:</strong></p>
        <p>Lado A: ${a}</p>
        <p>Lado B: ${b}</p>
        <p>Lado C: ${c}</p>
    `;
}

function procesarTriangulo() {
    const a = parseFloat(prompt("Lado A:"));
    const b = parseFloat(prompt("Lado B:"));
    const c = parseFloat(prompt("Lado C:"));

    if (a + b > c && a + c > b && b + c > a) {
        mostrarDatosIngresados(a, b, c); // Mostrar los datos ingresados
        const { tipoLados, tipoAngulos } = clasificarTriangulo(a, b, c);
        dibujarTriangulo(a, b, c);
        mostrarInformacion(tipoLados, tipoAngulos);
    } else {
        document.getElementById("triangleInfo").innerHTML = "<p style='color: red;'>Los lados no forman un triángulo válido.</p>";
        document.getElementById("triangleInputs").innerHTML = ""; // Limpiar datos ingresados
    }
}

procesarTriangulo();