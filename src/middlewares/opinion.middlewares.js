
export const categoryExistence = async (category) => {
    let arrayCategory = ['GENERAL', 'NEWS', 'ENTERTAIMENT', 'LIFESTYLE', 'SUCCESS STORIES'];
    if (!arrayCategory.includes(category)) {
        throw new Error('This category does not exists in categories ❌');
    }
}