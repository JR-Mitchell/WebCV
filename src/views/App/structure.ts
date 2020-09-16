//Contains interfaces and objects relevant for interfacing with the information stored in setup/structure.json

/**
 * Interface used for parsing a particular section
 */
interface SectionInterface {
    /**
     * The title of the section
     */
    sectionTitle: string,
    /**
     * The name of the component to render for this section
     */
    element: string
}

/**
 * Interface used for parsing a particular page
 */
interface PageInterface {
    /**
     * The title of the page
     */
    pageTitle: string;
    /**
     * The sections in the page
     */
    sections: SectionInterface[];
}

/**
 * Class used to provide information about a particular section
 */
class SectionObject {
    /**
     * The title of the section
     */
    sectionTitle: string;
    /**
     * The name of the component to render for this section
     */
    element: string;
    /**
     * The number of the section
     */
    sectionNumber: number;

    /**
     * Constructor method
     *
     * @param {SectionInterface} rawJson: the raw JSON data for the section,
     *      cast to SectionInterface
     * @param {number} sectionNumber: the index of the section in its page
     */
    constructor(rawJson: SectionInterface, sectionNumber: number) {
        this.sectionTitle = rawJson.sectionTitle;
        this.element = rawJson.element;
        this.sectionNumber = sectionNumber
    }
}

/**
 * Class used to provide information about a particular page
 */
class PageObject {
    /**
     * The title of the page
     */
    pageTitle: string;
    /**
     * The sections in the page
     */
    _sections: SectionObject[];
    /**
     * The number of the page
     */
    pageNumber: number;

    /**
     * Constructor method
     *
     * @param {PageInterface} rawJson: the raw JSON data for the page,
     *      cast to PageInterface
     * @param {number} pageNumber: the index of the page in the list of pages
     */
    constructor(rawJson: PageInterface, pageNumber: number) {
        this.pageTitle = rawJson.pageTitle;
        this._sections = rawJson.sections.map((section: SectionInterface, index: number) => {
            return new SectionObject(section,index);
        });
        this.pageNumber = pageNumber;
    }

    /**
     * Access to a particular SectionObject element by index
     *
     * @param {number} index: the section index to access
     *
     * @returns {SectionObject} section: the section with given index,
     *      if one exists
     */
    getSectionByIndex(index: number): SectionObject {
        return this._sections[index];
    }

    /**
     * Access to a particular SectionObject element by title
     *
     * @param {string} title: the title of the section to access
     *
     * @returns {SectionObject} page: the section with given title,
     *      if one exists
     */
    getSectionByTitle(title: string): SectionObject {
        let returnSection: SectionObject;
        this._sections.some((section: SectionObject) => {
            if (section.sectionTitle === title) {
                returnSection = section;
                return true;
            }
        });
        return returnSection;
    }

    /**
     * Gives a list of section titles, in order
     *
     * @returns {string[]} titleList: a list of all section titles
     */
    getSectionTitleList(): string[] {
        return this._sections.map((section: SectionObject) => {
            return section.sectionTitle;
        });
    }

    /**
     * Wrapper for map() function of underlying array
     *
     * @param {(section: SectionObject, index?: number, array?: SectionObject[])=>{T}} callback:
     *      function that is called for every section in the PageObject object.
     *
     * @returns {T[]} mapped: array containing the result of callback(section [, index [, array]])
     *      for each section in the PageObject object
     */
    map<T>(callback: (section: SectionObject, index?: number, array?: SectionObject[])=>T): T[] {
        return this._sections.map(callback);
    }
}

class Pages {
    /**
     * The PageObjects contained within
     */
    _pages: PageObject[];

    /**
     * Constructor method
     *
     * @param {PageInterface[]} rawJson: the raw JSON data storing a list of pages,
     *      cast to PageInterface[]
     */
    constructor(rawJson: PageInterface[]) {
        this._pages = rawJson.map((page: PageInterface, index: number) => {
            return new PageObject(page,index);
        });
    }

    /**
     * Access to a particular PageObject element by index
     *
     * @param {number} index: the page index to access
     *
     * @returns {PageObject} page: the page with given index,
     *      if one exists
     */
    getPageByIndex(index: number): PageObject {
        return this._pages[index];
    }

    /**
     * Access to a particular PageObject element by title
     *
     * @param {string} title: the title of the page to access
     *
     * @returns {PageObject} page: the page with given title,
     *      if one exists
     */
    getPageByTitle(title: string): PageObject {
        let returnPage: PageObject;
        this._pages.some((page: PageObject) => {
            if (page.pageTitle === title) {
                returnPage = page;
                return true;
            }
        });
        return returnPage;
    }

    /**
     * Gives a list of page titles, in order
     *
     * @returns {string[]} titleList: a list of all page titles
     */
    getPageTitleList(): string[] {
        return this._pages.map((page: PageObject) => {
            return page.pageTitle;
        });
    }

    /**
     * Wrapper for map() function of underlying array
     *
     * @param {(page: PageObject, index?: number, array?: PageObject[])=>{T}} callback:
     *      function that is called for every page in the Pages object.
     *
     * @returns {T[]} mapped: array containing the result of callback(page [, index [, array]])
     *      for each page in the Pages object
     */
    map<T>(callback: (page: PageObject, index?: number, array?: PageObject[])=>T): T[] {
        return this._pages.map(callback);
    }
}

export { SectionObject, PageObject, Pages };
