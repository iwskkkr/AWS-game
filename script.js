const floatingWindow = document.getElementById('floating-window');
const floatingTitle = document.getElementById('floating-title');
const floatingBody = document.getElementById('floating-body');

const details = {
    'ユーザー': {
        title: 'ユーザー',
        description: 'ユーザー: サービスを利用するエンドユーザー。',
        settings: ''
    },
    '開発者': {
        title: '開発者',
        description: '開発者: システム構成を管理するユーザー。',
        settings: ''
    },
    'IGW': {
        title: 'Internet Gateway',
        description: 'Internet Gateway: VPCとインターネット間の通信を可能にするゲートウェイ。',
        settings: '設定例<br>・VPC ID: vpc-12345<br>・State: attached'
    },
    'NAT-GW': {
        title: 'NAT Gateway',
        description: 'NAT Gateway: プライベートサブネットからインターネットへのアウトバウンド通信を可能にする。',
        settings: '設定例<br>・Subnet: Private Subnet<br>・Elastic IP: 54.123.45.67'
    },
    'IAMロール': {
        title: 'IAMロール',
        description: 'IAMロール: AWSリソースへのアクセス権限を管理。不要なロールはリスクです。',
        settings: '設定例<br>・Role Name: EC2Role<br>・Policies: AmazonS3ReadOnlyAccess'
    },
    'S3': {
        title: 'S3',
        description: 'S3: オブジェクトストレージ。公開設定に注意。',
        settings: '設定例<br>・Bucket Name: my-bucket<br>・Public Access: Block all public access (推奨)'
    },
    'EC2-公開': {
        title: 'EC2 (Public)',
        description: 'クラウドコンピューティングサービス。仮想サーバを自由に構築・利用できる。',
        settings: '<hr style="border: 1px solid #ccc;"><strong>AMI</strong><br>RedHat Enterprise 9.5<hr style="border: 1px solid #ccc;"><strong>セキュリティグループ</strong><br>インバウンドルール: 0.0.0.0/0<br>アウトバウンドルール: 0.0.0.0/0<hr style="border: 1px solid #ccc;"><strong>インスタンスタイプ</strong><br>t3.micro'
    },
    'EC2-非公開': {
        title: 'EC2 (Private)',
        description: 'EC2: プライベートサブネット。内部アクセス用。',
        settings: '設定例<br>・AMI: Amazon Linux 2<br>・Security Group: PrivateSG<br>・Instance Type: t3.small'
    },
    'RDS': {
        title: 'RDS',
        description: 'RDS: マネージドDB。ネットワーク設定を確認。',
        settings: '設定例<br>・Engine: MySQL 8.0<br>・DB Instance: db-instance<br>・Security Group: RDSSG'
    }
};

const securityHoles = {
    'S3': 'S3がPublic設定',
    'EC2-公開': 'EC2セキュリティグループが0.0.0.0/0',
    'IAMロール': '不必要なIAMロール'
};

function showFloatingWindow(resource, event) {
    const info = details[resource] || { title: resource, description: '詳細情報を設定してください。', settings: '' };
    floatingTitle.textContent = info.title;
    let bodyHtml = `<p>${info.description}</p>`;

    if (info.settings) {
        bodyHtml += `<div>${info.settings}</div>`;
    }

    // セキュリティホール判定と補助文
    if (securityHoles[resource]) {
        bodyHtml += `<p style="color:#c00;font-weight:bold;">※セキュリティホール候補: ${securityHoles[resource]}</p>`;
        bodyHtml += `<button onclick="checkSecurityHole('${resource}')">セキュリティホールか確認</button>`;
    } else {
        bodyHtml += '<p>現在、明確なセキュリティホールは設定されていません。</p>';
    }

    floatingBody.innerHTML = bodyHtml;
    floatingWindow.classList.remove('hidden');

    // 位置をクリックしたアイコンの近くに設定
    if (event) {
        const rect = event.target.getBoundingClientRect();
        floatingWindow.style.left = `${rect.left + window.scrollX + 70}px`;
        floatingWindow.style.top = `${rect.top + window.scrollY - 50}px`;
        floatingWindow.style.position = 'absolute';
    }
}

function checkSecurityHole(resource) {
    if (securityHoles[resource]) {
        alert(`正解！セキュリティホール発見: ${securityHoles[resource]}`);
    } else {
        alert('これはセキュリティホールではありません。');
    }
    closeFloatingWindow();
}

function closeFloatingWindow() {
    floatingWindow.classList.add('hidden');
}

// クリックで外側を閉じる（追加のモーダル対応は今後）
window.addEventListener('click', (event) => {
    if (!floatingWindow.classList.contains('hidden') && !floatingWindow.contains(event.target) && event.target.closest('img') == null) {
        closeFloatingWindow();
    }
});