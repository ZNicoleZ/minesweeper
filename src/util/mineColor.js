export const mineColor = () => {
    let colors = ["#F266AB", "#A459D1", "#2CD3E1"];
    return colors[Math.floor(Math.random() * colors.length)];
};