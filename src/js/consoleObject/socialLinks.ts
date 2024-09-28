export class SocialLinks {
    constructor(private container: HTMLElement) {}
  
    appendRrss(url: string, imgSrc: string, altText: string) {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
  
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = altText;
      img.style.width = "24px";
      img.style.height = "24px";
      img.style.margin = "0 5px";
  
      link.appendChild(img);
      this.container.appendChild(link);
    }
  }
  