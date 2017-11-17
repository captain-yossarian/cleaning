export const imageGenerator=(context,quantity,extension='jpg')=>Array(quantity).fill(0).map((el, i) =>context(`./${i + 1}.${extension}`));
/**
 * Use example
 * var context=require.context('./img', false, /[0-9]+(.png)$/);
 * var images = imageGenerator(context, 6, 'png');
 *
 * Then you can iterate 'images'
 */ 
