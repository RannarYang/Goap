/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:14:55 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-06 00:15:20
 */
class PickUpOreAction extends GoapAction{
	public constructor() {
		super();
		this.addPrecondition ("hasOre", false); // don't get a ore if we already have one
		this.addEffect ("hasOre", true); // we now have a ore
	}
}