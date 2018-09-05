/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:13:23 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-06 00:13:50
 */
class MineOreAction extends GoapAction{
	public constructor() {
		super();
		this.addPrecondition ("hasTool", true); // we need a tool to do this
		this.addPrecondition ("hasOre", false); // if we have ore we don't want more
		this.addEffect ("hasOre", true);
	}
}