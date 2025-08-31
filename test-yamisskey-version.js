// Yamisskeyバージョン処理のテスト用スクリプト
const testVersions = [
  '2024.7.0-nayami-2.1.0',
  '2024.10.1-yami-1.3.8',
  '2024.8.0',
  '2023.12.5-alpha.1'
];

function parseYamisskeyVersion(version) {
  // Yamisskeyバージョン形式の正規表現 (nayami, yami対応)
  const yamisskeyRegex = /^(\d+\.\d+\.\d+)-(na)?yami-(\d+)\.(\d+)\.(\d+)$/;
  const match = version.match(yamisskeyRegex);
  
  if (match) {
    const [, base, prefix, major, minor, patch] = match;
    return {
      isYamisskey: true,
      baseVersion: base,
      yamisskeyType: prefix ? `${prefix}yami` : 'yami',
      yamisskeyMajor: parseInt(major),
      yamisskeyMinor: parseInt(minor),
      yamisskeyPatch: parseInt(patch),
      fullVersion: version
    };
  } else {
    return {
      isYamisskey: false,
      baseVersion: version.split('-')[0],
      fullVersion: version
    };
  }
}

function incrementYamisskeyVersion(currentVersion) {
  const parsed = parseYamisskeyVersion(currentVersion);
  
  if (parsed.isYamisskey) {
    return `${parsed.baseVersion}-${parsed.yamisskeyType}-${parsed.yamisskeyMajor}.${parsed.yamisskeyMinor}.${parsed.yamisskeyPatch + 1}`;
  } else {
    return `${parsed.baseVersion}-nayami-1.0.0`;
  }
}

function getTargetVersion(currentVersion) {
  const parsed = parseYamisskeyVersion(currentVersion);
  return parsed.baseVersion;
}

console.log('Yamisskey Version Handler Test');
console.log('=================================');

testVersions.forEach(version => {
  console.log(`\nTesting version: ${version}`);
  const parsed = parseYamisskeyVersion(version);
  console.log('Parsed:', parsed);
  console.log('Increment:', incrementYamisskeyVersion(version));
  console.log('Target Version:', getTargetVersion(version));
});