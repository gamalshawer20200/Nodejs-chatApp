var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0
}

module.exports = {
    isRealString
}

// trim() convert '  g ' => 'g'  /  '     g  m    ' => 'g  m' do not trim the interior ones