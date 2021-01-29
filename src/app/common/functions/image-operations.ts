export const drawImage = (id, logoUrl) => {
  const INTERVAL = setInterval(() => {
    if ((document.getElementById(id).firstChild as HTMLImageElement).src === 'unsafe:data:'){
      (document.getElementById(id).firstChild as HTMLImageElement).src = logoUrl;
      clearInterval(INTERVAL);
    }
  }, 1);
  setTimeout(() => {
    clearInterval(INTERVAL);
  }, 3000);
};
