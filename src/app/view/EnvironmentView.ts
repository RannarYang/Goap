class EnvironmentView extends eui.Component{
	private supplyPileComp1:SupplyPileComponent;
	private supplyPileComp2:SupplyPileComponent;
	private ironRockComp1:IronRockComponent;
	private ironRockComp2:IronRockComponent;
	private ironRockComp3:IronRockComponent;
	private treeComp1:TreeComponent;
	private treeComp2:TreeComponent;
	private treeComp3:TreeComponent;
	private treeComp4:TreeComponent;

	private choppingBlockComp:ChoppingBlockComponent;
	private forgeComp:ForgeComponent;
	
	private blackSmith:Blacksmith;
	private logger:Logger;
	private miner:Miner;
	private woodCutter:WoodCutter;
	
	public constructor() {
		super();
	}
	protected childrenCreated() {
		super.childrenCreated();
	}
	protected createChildren() {
		super.createChildren();
		this.skinName = EnvironmentViewSkin;

		this.initEnvironment();
	}

	private initEnvironment() {
		Environment.supplyPileComps = [this.supplyPileComp1, this.supplyPileComp2]; 
		Environment.rockComps = [this.ironRockComp1, this.ironRockComp2, this.ironRockComp3];
		Environment.treeComps = [this.treeComp1, this.treeComp2, this.treeComp3, this.treeComp4];

		Environment.forgeComps = [this.forgeComp];
		Environment.choppingBlockComps = [this.choppingBlockComp];


		// 设置backpack
		let smithBP = new BackPackComponent(0,0,0);
		this.blackSmith.setBackPack(smithBP);

		let loggerBP = new BackPackComponent(0,0,0);
		this.logger.setBackPack(loggerBP);

		let minerBP = new BackPackComponent(0,0,0);
		this.miner.setBackPack(minerBP);

		let woodCutterBP = new BackPackComponent(0,0,0);
		this.woodCutter.setBackPack(woodCutterBP);

		this.startTick();
		// this.update(3);
	}
	/**开始游戏stick */
	public startTick() {
		this.lastTimeStamp = egret.getTimer();
		egret.startTick(this.updateTimeStamp, this);
	}
	
	private lastTimeStamp: number;
	private updateTimeStamp(timeStamp): boolean {
		this.update(timeStamp - this.lastTimeStamp);
		this.lastTimeStamp = timeStamp;
		return true;
	}
	public update(delta: number) {
		this.miner.update(delta);
		this.blackSmith.update(delta);
		this.logger.update(delta);
		this.woodCutter.update(delta);
	}
}