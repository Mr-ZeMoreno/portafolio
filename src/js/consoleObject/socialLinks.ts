export class SocialLinks {
  constructor(private container: HTMLElement) {}

  appendRrss(url: string, imgSrc: string, altText: string) {
    const $link = document.createElement("a");
    $link.href = url;
    $link.target = "_blank";
    $link.rel = "noopener noreferrer";
    $link.classList.add("flex");
    $link.classList.add("flex-col");
    $link.classList.add("text-center");
    $link.classList.add("items-center");

    const $img = document.createElement("img");
    $img.src = imgSrc;
    $img.alt = altText;
    $img.classList.add("h-10");
    $img.classList.add("w-10");
    $img.classList.add("md:h-9");
    $img.classList.add("md:w-9");
    $img.style.margin = "0 5px";

    $link.appendChild($img);

    if (altText.length > 0) {
      const $paragraph = document.createElement("p");
      $paragraph.textContent = altText;
      $link.appendChild($paragraph);
    }

    this.container.appendChild($link);
  }
}
