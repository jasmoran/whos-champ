class ArrayUtil {
  compact<R>(array: (R | null | undefined)[]): R[] {
    return array.filter(this.notEmpty);
  }

  private notEmpty<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }
}

export default new ArrayUtil();