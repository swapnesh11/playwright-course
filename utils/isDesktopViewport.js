export const isDesktopViewport = async(page) => {
    const size = page.viewportSize()
    return size.width >= 600
    //return true/false
}