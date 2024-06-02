import React, { useState, useEffect } from 'react';
import copyfileImage from './greenCopyfile.png';
import arrowForward from './grayArrowForward.png';
import './PasswordGenerator.css';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('P4$5W0rD!');
  const [passwordLength, setPasswordLength] = useState(0);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    updateSliderBackground();
  }, [passwordLength]);

  const updateSliderBackground = () => {
    const slider = document.getElementById('characterLenghtRange');
    const value = (passwordLength - slider.min) / (slider.max - slider.min) * 100;
    slider.style.background = `linear-gradient(to right, #a4ffb0 0%, #a4ffb0 ${value}%, #18171f ${value}%, #18171f 100%)`;
  };

  const copyToClipboard = () => {
    const textarea = document.createElement('textarea');
    textarea.textContent = password;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      alert('Senha copiada para a área de transferência!');
    } catch (err) {
      alert('Falha ao copiar a senha para a área de transferência.');
    }
    document.body.removeChild(textarea);
  };
  
  const generatePassword = () => {
    let generatedPassword = '';
    let characters = '';

    if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) characters += '0123456789';
    if (includeSymbols) characters += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    for (let i = 0; i < passwordLength; i++) {
      generatedPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return generatedPassword;
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setPassword(newPassword);
    const newStrength = getPasswordStrength(newPassword);
    setStrength(newStrength);
  };

  return (
    <div>
      <h1>Password Generator</h1>
      <div id="mainFlexBox">
        <div id="flexBox1">
          <div id="passwordDisplay">{password}</div>
          <div id="copyfileContainer" onClick={copyToClipboard}>
            <img id="copyfileImage" src={copyfileImage} alt="Copy" />
          </div>
        </div>
        <div id="flexBox2">
          <div id="passwordOptions1">
            <div id="characterLenght">
              <p>Character Length</p>
              <div id="characterLenghtDisplay">{passwordLength}</div>
            </div>
            <input
              type="range"
              id="characterLenghtRange"
              name="passwordCharacterRange"
              min="0"
              max="20"
              value={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
            />
          </div>
          <div id="passwordOptions2">
            <div id="divCheckbox1">
              <input
                className="checkboxes"
                id="checkbox1"
                type="checkbox"
                name="upperCaseCheckBox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />
              <label htmlFor="checkbox1"> Include Uppercase Letters </label>
            </div>
            <div id="divCheckbox2">
              <input
                className="checkboxes"
                id="checkbox2"
                type="checkbox"
                name="lowerCaseCheckBox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />
              <label htmlFor="checkbox2"> Include Lowercase Letters </label>
            </div>
            <div id="divCheckbox3">
              <input
                className="checkboxes"
                id="checkbox3"
                type="checkbox"
                name="numbersCheckBox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
              <label htmlFor="checkbox3"> Include Numbers</label>
            </div>
            <div id="divCheckbox4">
              <input
                className="checkboxes"
                id="checkbox4"
                type="checkbox"
                name="symbolsCheckBox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />
              <label htmlFor="checkbox4"> Include Symbols </label>
            </div>
          </div>
          <div id="passwordStrenght">
            <p>STRENGTH</p>
            <div id="passwordStrenghtDisplay">
              <div id="strenghtIndicator">{['VERY WEAK', 'WEAK', 'MEDIUM', 'STRONG'][strength - 1]}</div>
              <div id="lights">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`light ${i < strength ? 'on ' + ['very-weak', 'weak', 'medium', 'strong'][strength - 1] : ''}`}></div>
                ))}
              </div>
            </div>
          </div>
          <div id="passwordGenerator">
            <button type="button" id="buttonGenerator" onClick={handleGeneratePassword}>
              <div>
                GENERATE <img id="arrowImage" src={arrowForward} alt="Arrow" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
