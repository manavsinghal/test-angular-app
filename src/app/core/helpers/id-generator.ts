

export class IdGenerator {
	static newId(): number {
		return Math.floor(10000000 + Math.random() * 90000000);
	}
}

