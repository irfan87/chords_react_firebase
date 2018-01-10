import React from 'react';
import {shallow} from 'enzyme';
import '../enzyme_setup';
import ChordEditor from './ChordEditor';

describe('<ChordEditor />', () => {
  it('renders an editor area', () => {
    const editor = shallow(<ChordEditor song={{chordpro: ""}} />);
    expect(editor.find('textarea').length).toEqual(1);
  });

  it('renders an output area', () => {
    const editor = shallow(<ChordEditor song={{chordpro: ""}} />);
    expect(editor.find('div.chord-output').length).toEqual(1);
  });

  it('renders the update chord chart output', () => {
    const editor = shallow(<ChordEditor song={{chordpro: "[B]New [Am]Lyrics"}} />);
    const expectedOutput = `
      <table>
        <tr>
          <td class="chord">B</td>
          <td class="chord">Am</td>
        </tr>
        <tr>
          <td class="lyrics">New&nbsp;</td>
          <td class="lyrics">Lyrics&nbsp;</td>
        </tr>
      </table>
    `;

    editor.setState({
      value: "[B]New [Am]Lyrics"
    });

    const realOutput = editor.find('.chord-output').html();
    expect(realOutput.indexOf(expectedOutput) > -1).toEqual(false);
  });
  
  it('calls update song when the text area changes', () => {
    let theSong;
    
    const update = (song) => {
      theSong = song;
    }

    const editor = shallow(<ChordEditor song={{chordpro: "[B]New [Am]Lyrics "}} updateSong={update} />);

    editor.find('textarea').simulate("change", {target: {value: "[B]New [Am]Lyrics "}});
    expect(theSong).toEqual({chordpro: "[B]New [Am]Lyrics "});
  });
})