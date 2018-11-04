class SupplyPileComponent extends VGameObject{
	private txtToolNum:eui.Label;
	private txtOreNum:eui.Label;
	private txtLogNum:eui.Label;
	private txtFirewoodNum:eui.Label;


	private _numTools: number; // for mining ore and chopping logs
	public get numTools() {
		return this._numTools;
	}
	public set numTools(val: number) {
		val = Number(val);
		this._numTools = val;
		this.txtToolNum && (this.txtToolNum.text = "工具：" + val);
	}

	private _numLogs: number; // makes firewood
	public get numLogs(): number {
		return this._numLogs;
	}
	public set numLogs(val: number) {
		val = Number(val);
		this._numLogs = val;
		this.txtLogNum && (this.txtLogNum.text = "原木：" + val);
		
	}


	private _numFirewood: number; // what we want to make
	public get numFirewood(): number {
		return this._numFirewood;
	}
	public set numFirewood(val: number) {
		val = Number(val);
		this._numFirewood = val;
		this.txtFirewoodNum && (this.txtFirewoodNum.text = "木柴：" + val);
	}


	private _numOre: number; // makes tools
	public get numOre(): number {
		return this._numOre;
	}
	public set numOre(val: number) {
		val = Number(val);
		this._numOre = val;
		this.txtOreNum && (this.txtOreNum.text = "矿石：" + val);
	}
	// public init(numTools: number, numLogs: number, numFirewood: number, numOre: number) {
	// 	this.numTools = numTools;
	// 	this.numLogs = numLogs;
	// 	this.numFirewood = numFirewood;
	// 	this.numOre = numOre;
	// }

	protected childenCreated() {
		super.childrenCreated();
		this.txtToolNum.text = "工具：" + this.numTools;
		this.txtOreNum.text = "矿石：" + this.numOre;
		this.txtLogNum.text = "原木：" + this.txtLogNum;
		this.txtFirewoodNum.text = "木柴：" + this.txtFirewoodNum;
	}
}