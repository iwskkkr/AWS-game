function showDetail(service) {
    const details = {
        'ユーザー': 'ユーザーアイコン: システムの利用者',
        '開発者': '開発者アイコン: システムの開発者',
        'IAMロール': 'IAMロール: AWSリソースへのアクセス権限を定義。不必要なロールはセキュリティホールです。',
        'EC2': 'EC2: 仮想サーバー。セキュリティグループの設定を確認してください。',
        'RDS': 'RDS: リレーショナルデータベースサービス。'
    };
    document.getElementById('detail-text').innerText = details[service] || '詳細情報なし';
    document.getElementById('detail-modal').style.display = 'block';
}

function checkSecurityHole(hole) {
    const holes = [
        'S3がPublic設定',
        'EC2セキュリティグループが0.0.0.0/0',
        '不必要なIAMロール'
    ];
    if (holes.includes(hole)) {
        alert('セキュリティホール発見！ ' + hole);
    } else {
        alert('これはセキュリティホールではありません。');
    }
}

function closeModal() {
    document.getElementById('detail-modal').style.display = 'none';
}

// モーダル外クリックで閉じる
window.onclick = function(event) {
    const modal = document.getElementById('detail-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}