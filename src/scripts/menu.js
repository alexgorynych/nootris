function subscribe(target, eventName, handler) {
    target.addEventListener(eventName, handler);
    return () => target.removeEventListener(eventName, handler);
}

export default class Menu {
    constructor(MenuObj) {
        this.isOpen = false;

        this.header = document.getElementsByClassName(MenuObj.header)[0];

        this.btn = document.getElementsByClassName(MenuObj.button)[0];
        this.btnClassActive1 = MenuObj.btnClassActive1;
        this.btnClassActive2 = MenuObj.btnClassActive2;

        this.menu = document.getElementsByClassName(MenuObj.menu)[0];
        this.menuActive = MenuObj.menuActive;

        this.menuContainer = document.getElementsByClassName(
            MenuObj.menuContainer
        )[0];

        this.arrayLink = Array.from(
            document.getElementsByClassName(MenuObj.links)
        );

        this.menu.addEventListener("click", (evt) => {
            if (this.menuContainer.offsetLeft > evt.clientX) {
                this.removeMenu();
            }
        });

        this.arrayLink.forEach((link) => {
            link.addEventListener("click", this.removeMenu.bind(this));
        });

        this.removeEventBtn = subscribe(
            this.btn,
            "click",
            this.addMenu.bind(this)
        );

        this.resize();
    }

    addMenu() {
        if (this.isOpen != null) {
            this.isOpen = null;
            this.removeEventBtn();

            this.menu.classList.add(this.menuActive);

            document.body.parentNode.style.overflow = "hidden";

            this.btn.classList.add(this.btnClassActive1);

            setTimeout(() => {
                this.menuContainer.style.transform = "translateX(0)";
            }, 0);

            setTimeout(() => {
                this.btn.classList.add(this.btnClassActive2);
                this.isOpen = true;
            }, 200);
            this.removeEventBtn = subscribe(
                this.btn,
                "click",
                this.removeMenu.bind(this)
            );
        }
    }

    removeMenu() {
        if (this.isOpen != null) {
            this.isOpen = null;
            this.removeEventBtn();
            document.body.parentNode.style.overflowY = "scroll";
            this.btn.classList.remove(this.btnClassActive2);

            this.menuContainer.style.transform = `translateX(${this.menuContainerSize}px)`;

            setTimeout(() => {
                this.btn.classList.remove(this.btnClassActive1);
            }, 200);

            setTimeout(() => {
                this.menu.classList.remove(this.menuActive);
                this.isOpen = false;
            }, 400);

            this.removeEventBtn = subscribe(
                this.btn,
                "click",
                this.addMenu.bind(this)
            );
        }
    }

    resize() {
        const hh = this.header.offsetHeight + this.header.offsetTop;
        this.menu.style.top = hh + "px";
        this.menuContainerSize =
            window.innerWidth > 380 ? 380 : window.innerWidth;
        const height =
            Math.max(
                document.documentElement.clientHeight,
                window.innerHeight || 0
            ) - hh;
        this.menu.style.height = `${height}px`;
        this.menuContainer.style.height = `${height}px`;

        if (!this.isOpen) {
            this.menuContainer.style.transform = `translateX(${this.menuContainerSize}px)`;
        }
    }
}
