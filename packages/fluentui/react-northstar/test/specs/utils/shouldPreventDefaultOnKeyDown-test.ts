import { shouldPreventDefaultOnKeyDown } from '../../../src/utils/shouldPreventDefaultOnKeyDown';

describe('shouldPreventDefaultOnKeyDown', () => {
  it('handles proper keys', () => {
    expect(shouldPreventDefaultOnKeyDown(new KeyboardEvent('keydown', { key: 'Backspace' }))).toBe(false);
    expect(shouldPreventDefaultOnKeyDown(new KeyboardEvent('keydown', { key: 'Delete' }))).toBe(false);

    expect(shouldPreventDefaultOnKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }))).toBe(true);
    expect(shouldPreventDefaultOnKeyDown(new KeyboardEvent('keydown', { key: ' ' }))).toBe(true);
  });

  it('ignores for field-like targets', () => {
    const divEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    const inputEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    const textareaEvent = new KeyboardEvent('keydown', { key: 'Enter' });

    document.createElement('div').dispatchEvent(divEvent);
    document.createElement('input').dispatchEvent(inputEvent);
    document.createElement('textarea').dispatchEvent(textareaEvent);

    expect(shouldPreventDefaultOnKeyDown(divEvent)).toBe(true);
    expect(shouldPreventDefaultOnKeyDown(inputEvent)).toBe(false);
    expect(shouldPreventDefaultOnKeyDown(textareaEvent)).toBe(false);
  });

  it('ignores for editable targets', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    const element = document.createElement('div');

    // @ts-ignore
    element.isContentEditable = true;
    element.dispatchEvent(event);

    expect(shouldPreventDefaultOnKeyDown(event)).toBe(false);
  });
});
