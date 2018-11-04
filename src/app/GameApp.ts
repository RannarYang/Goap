class GameApp {
	private stage: egret.Stage;
	private eView: EnvironmentView;
	public init(stage: egret.Stage) {
		this.stage = stage;
	}

	public start() {
		let eView = this.eView = new EnvironmentView();
        this.stage.addChild(eView);
	}

	

	private static instance: GameApp;
	public static get I(): GameApp {
		if(!this.instance) {
			this.instance = new GameApp();
		}
		return this.instance;
	}
}