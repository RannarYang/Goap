/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:11:26 
 * @Last Modified by:   RannarYang 
 * @Last Modified time: 2018-09-06 00:11:26 
 */
class DropOffOreAction extends GoapAction{
	public constructor() {
		super();
		this.addPrecondition ("hasOre", true); // can't drop off ore if we don't already have some
		this.addEffect ("hasOre", false); // we now have no ore
		this.addEffect ("collectOre", true); // we collected ore
	}
}